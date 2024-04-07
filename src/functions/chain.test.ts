import { chain } from "./chain";

describe( 'chain', () => {
  it('works', () => {

    function* g() {
      yield 1;
      yield 2;
    }

    expect(chain(
      [
        g
      ]
    )).toEqual(true);
  });
});
