import { LastGeneratorYieldType, TupleOfGeneratorChains } from "../types/Chain";

export function chain<T extends any[]>(
  gens: [...TupleOfGeneratorChains<T>],
): Generator<LastGeneratorYieldType<T>>;

export function* chain(gens: ((...args: any) => Generator<any>)[]) {
  const initialGenerator = gens[0]();

  function* processChain(index: number, input: any): any {
    if (index == gens.length) {
      yield input;
      return;
    }
    const currentGenerator = gens[index](input);
    let { value, done } = currentGenerator.next();
    while (!done) {
      yield* processChain(index + 1, value);
      const next = currentGenerator.next()
      value = next.value;
      done = next.done;
    }
  }

  for (const initialValue of initialGenerator) {
    yield* processChain(1, initialValue);
  }
}
