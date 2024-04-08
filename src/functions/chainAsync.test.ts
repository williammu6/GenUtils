import { chainAsync } from './chainAsync';

async function* g1() {
  yield Promise.resolve('a');
  yield Promise.resolve('b');
}

async function* g2(arg: string) {
  yield Promise.resolve(arg + 'x');
  yield Promise.resolve(arg + 'y');
}

async function* g3(arg: string) {
  yield Promise.resolve(arg + '1');
  yield Promise.resolve(arg + '2');
}

describe('chain', () => {
  it('works with 1 generator', async () => {
    const results: any[] = [];
    for await (const result of chainAsync([g1])) {
      results.push(result);
    }
    expect(results).toEqual(['a', 'b']);
  });

  it('works with 2 generators', async () => {
    const results: any[] = [];
    for await (const value of chainAsync([g1, g2])) {
      results.push(value);
    }
    expect(results).toEqual(['ax', 'ay', 'bx', 'by']);
  });

  it('works with many generators', async () => {
    const results: any[] = [];
    for await (const value of chainAsync([g1, g2, g3])) {
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
