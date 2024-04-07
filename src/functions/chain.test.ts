import { chain } from './chain';

function* g1() {
  yield 'a';
  yield 'b';
}

function* g2(arg: string) {
  yield arg + 'x';
  yield arg + 'y';
}

function* g3(arg: string) {
  yield arg + '1';
  yield arg + '2';
}

describe('chain', () => {
  it('works with 1 generator', () => {
    const generator = chain([g1]);
    const results: any[] = [];
    for (const result of generator) {
      results.push(result);
    }
    expect(results).toEqual(['a', 'b']);
  });

  it('works with 2 generators', () => {
    const results: any[] = [];
    for (const value of chain([g1, g2])) {
      results.push(value);
    }
    expect(results).toEqual(['ax', 'ay', 'bx', 'by']);
  });

  it('works with many generators', () => {
    const results: any[] = [];
    for (const value of chain([g1, g2, g3])) {
      results.push(value);
    }
    expect(results).toEqual([
      'ax1',
      'ax2',
      'ay1',
      'ay2',
      'bx1',
      'bx2',
      'by1',
      'by2',
    ]);
  });
});
