type TupleToArgs<T extends any[]> = Extract<
  [
    [],
    ...{
      [I in keyof T]: [
        arg: T[I] extends Generator<infer R>
          ? R
          : T[I] extends AsyncGenerator<infer A, any, any>
            ? A
            : never,
      ];
    },
  ],
  Record<keyof T, any>
>;

export type LastGeneratorYieldType<T extends any[]> = T extends [
  ...infer _,
  infer L,
]
  ? L extends Generator<infer R, any, any>
    ? R
    : L extends AsyncGenerator<infer A, any, any>
      ? A
      : never
  : never;

export type TupleOfGeneratorChains<T extends any[]> = {
  [I in keyof T]: (...args: Extract<TupleToArgs<T>[I], any[]>) => T[I];
};
