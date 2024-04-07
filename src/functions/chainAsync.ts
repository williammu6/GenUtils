import { LastGeneratorYieldType, TupleOfGeneratorChains } from '../types/Chain';

export function chainAsync<T extends any[]>(
  gens: [...TupleOfGeneratorChains<T>],
): AsyncGenerator<LastGeneratorYieldType<T>>;

export async function* chainAsync(
  gens: ((...args: any) => AsyncGenerator<any>)[],
) {
  async function* processChain(index: number, input: any): any {
    if (index == gens.length) {
      yield input;
      return;
    }

    const currentGenerator = gens[index](input);
    for await (const value of currentGenerator) {
      yield* processChain(index + 1, value);
    }
  }

  const initialGenerator = gens[0]();
  for await (const initialValue of initialGenerator) {
    yield* processChain(1, initialValue);
  }
}
