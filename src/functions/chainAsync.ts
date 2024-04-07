import { LastGeneratorYieldType, TupleOfGeneratorChains } from '../types/Chain';

export function chainAsync<T extends any[]>(
  gens: [...TupleOfGeneratorChains<T>],
): AsyncGenerator<LastGeneratorYieldType<T>>;

export async function* chainAsync(
  gens: ((...args: any) => AsyncGenerator<any>)[],
) {
  const initialGenerator = gens[0]();

  async function* processChain(index: number, input: any): any {
    if (index == gens.length) {
      yield input;
      return;
    }
    const currentGenerator = gens[index](input);
    let { value, done } = await currentGenerator.next();
    while (!done) {
      yield* processChain(index + 1, value);
      const next = await currentGenerator.next();
      value = next.value;
      done = next.done;
    }
  }

  for await (const initialValue of initialGenerator) {
    yield* processChain(1, initialValue);
  }
}
