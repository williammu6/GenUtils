export function chain<T extends any[]>(
  gens: [...TupleOfGeneratorChains<T>],
): LastGeneratorYieldType<T>;

export function chain(gens: ((...args: any) => Generator<any>)[]) {
  return (function* (): Generator<any, void, unknown> {
    console.error('Imhere');
    let input: any;
    let output: any;
    for (const gen of gens) {
      const value = gen(input).next().value;
      output = value;
    }
  })();
}
