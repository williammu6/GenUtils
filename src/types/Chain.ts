type GeneratorYieldType<T> =
  T extends Generator<infer R>
    ? R
    : T extends AsyncGenerator<infer A, any, any>
      ? A
      : never;

type TupleToArgs<T extends any[]> = Extract<
  [
    [],
    ...{
      [I in keyof T]: [arg: GeneratorYieldType<T[I]>];
    },
  ],
  Record<keyof T, any>
>;

export type LastGeneratorYieldType<T extends any[]> = T extends [
  ...infer _,
  infer L,
]
  ? GeneratorYieldType<L>
  : never;

export type TupleOfGeneratorChains<T extends any[]> = {
  [I in keyof T]: (...args: Extract<TupleToArgs<T>[I], any[]>) => T[I];
};
