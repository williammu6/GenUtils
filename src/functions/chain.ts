import { LastGeneratorYieldType, TupleOfGeneratorChains } from '../types/Chain';

export function chain<T extends any[]>(
  gens: [...TupleOfGeneratorChains<T>],
): Generator<LastGeneratorYieldType<T>>;

export function chain(gens: ((...args: any) => Generator<any>)[]) {
  function* processChain(index: number, input?: any): any {
    if (index == gens.length) {
      yield input;
      return;
    }

    const currentGenerator = gens[index](input);
    for (const value of currentGenerator) {
      yield* processChain(index + 1, value);
    }
  }

  return processChain(0);
}
