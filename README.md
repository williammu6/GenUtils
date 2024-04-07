# genchain

genchain is a library that provides utility functions for chaining generators.

## Installation

You can install MyPackage via npm:

```sh
npm install genchain
```

## Usage

### `chain(generators)`

The `chain` function chains a list of generators, executing one after the other. The output of each generator becomes the input of the next generator in the chain.

#### Parameters

- `generators`: An array of generator functions.

#### Returns

A generator yielding the output of the last generator in the chain.

#### Example

```ts
import { chain } from 'genchain';

function* generator1() {
  yield 1;
  yield 2;
}

function* generator2(input: number) {
  yield input * 2;
}

const chainedGenerator = chain([generator1, generator2]);
for (const value of chainedGenerator) {
  console.log(value); // Output: 2, 4
}
```

### `chainAsync(generators)`

The `chainAsync` function performs the same operation as `chain`, but it supports asynchronous generator functions.

#### Parameters

- `generators`: An array of asynchronous generator functions.

#### Returns

A generator yielding the output of the last generator in the chain.

#### Example

```ts
import { chainAsync } from 'genchain';

async function* asyncGenerator1() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
}

async function* asyncGenerator2(input) {
  yield input * 2;
}

(async () => {
  const chainedGenerator = chainAsync([asyncGenerator1, asyncGenerator2]);
  for await (const value of chainedGenerator) {
    console.log(value); // Output: 2, 4
  }
})();
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
