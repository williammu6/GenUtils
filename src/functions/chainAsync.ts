import { LastGeneratorYieldType, TupleOfGeneratorChains } from '../types/Chain';

export function chainAsync<T extends any[]>(
  gens: [...TupleOfGeneratorChains<T>],
): AsyncGenerator<LastGeneratorYieldType<T>>;

export function chainAsync(gens: ((...args: any) => AsyncGenerator<any>)[]) {
  async function* processChain(index: number, input?: any): any {
    if (index == gens.length) {
      yield input;
      return;
    }
    for await (const value of gens[index](input)) {
      yield* processChain(index + 1, value);
    }
  }

  return processChain(0);
}
