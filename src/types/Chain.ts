type GeneratorFn<T> = (...args: any) => Generator<T>;

type TupleToArgs<T extends any[]> = Extract<
  [[], ...{ [I in keyof T]: [arg: T[I]] }],
  Record<keyof T, any>
>;

type LastGeneratorYieldType<T extends any[]> = T extends [...infer _, infer L]
  ? L extends GeneratorFn<infer R>
    ? R
    : never
  : never;

type TupleOfGeneratorChains<T extends any[]> = {
  [I in keyof T]: (...args: Extract<TupleToArgs<T>[I], any[]>) => T[I];

  // [I in keyof T]: (...args: any) => T[I];
};

type TupleToArgs2<T extends any[]> = Extract<
  [[], ...{ [I in keyof T]: [arg: T[I]] }],
  Record<keyof T, any>
>;

type TupleToChain<T extends any[]> = {
  [I in keyof T]: (...args: Extract<TupleToArgs2<T>[I], any[]>) => T[I];
};

type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

function callChain<T extends any[]>(fns: [...TupleToChain<T>]): Last<T>;
function callChain(funcs: ((...args: any) => any)[]) {
  const [f0, ...fs] = funcs;
  return fs.reduce((a, f) => f(a), f0());
}

callChain([() => 123, (input) => input.toString()]);
