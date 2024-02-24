import test from 'ava';
import { SealedArray } from '../index';
import '../index';

test('selects first characters using LINQ', (t) => {
    t.notThrows(() => {
        const arr: string[] = ['Hello', 'World', 'Foo', 'Bar'];
        const selectRes: string[] = arr.select(s => s[0]);

        t.assert(arr.length === selectRes.length);

        for (let i = 0; i < arr.length; i++) {
            t.assert(arr[i][0] === selectRes[i]);
        }
    });
});

test('custom select on SealedArray extracts first characters', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<string, 4> = ['Hello', 'World', 'Foo', 'Bar'].toSealedArray();
        const selectRes: string[] = arr.select(s => s[0]);

        t.assert(arr.length === selectRes.length);

        for (let i = 0; i < arr.length; i++) {
            t.assert(arr.get(i)[0] === selectRes[i]);
        }
    });
});

test('selectMany on nested arrays flattens them', (t) => {
    t.notThrows(() => {
        const arr: string[][] = [['Hello', 'World'], ['Foo', 'Bar']];
        const selectRes: string[] = arr.selectMany(a => a);
        t.assert(arr.map(i => i.length).reduce((a, b) => a + b) === selectRes.length);
    });
});

test('custom selectMany on SealedArray flattens nested arrays', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<string[], 2> = [['Hello', 'World'], ['Foo', 'Bar']].toSealedArray();
        const selectRes: string[] = arr.selectMany(a => a);
        t.assert(selectRes.length === 4);
    });
});


test('where filters elements based on condition', (t) => {
    t.notThrows(() => {
        const arr: string[] = ['Foo', 'World', 'Foo', 'Bar'];
        const selectRes: string[] = arr.where(a => a.startsWith('F'));
        t.assert(selectRes.length === 2);
    });
});

test('Test LINQ custom where', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<string, 4> = ['Foo', 'World', 'Foo', 'Bar'].toSealedArray();
        const selectRes: string[] = arr.where(a => a.startsWith('F'));
        t.assert(selectRes.length == 2);
    });
});

test('custom where on SealedArray filters elements based on condition', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<string, 4> = ['Foo', 'World', 'Foo', 'Bar'].toSealedArray();
        const selectRes: string[] = arr.where(a => a.startsWith('F'));
        t.assert(selectRes.length === 2);
    });
});

test('custom until on SealedArray stops at the element that satisfies the condition', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<string, 4> = ['Foo', 'World', 'Foo', 'Bar'].toSealedArray();
        const selectRes: string[] = arr.until(a => a.startsWith('W'));
        t.assert(selectRes.length === 1);
    });
});

test('count on array counts elements based on condition', (t) => {
    t.notThrows(() => {
        const arr: number[] = [50, 20, -10, -25];
        t.assert(arr.count(i => i >= 0) === 2);
    });
});

test('Test LINQ custom count', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<number, 4> = [50, 20, -10, -25].toSealedArray();
        t.assert(arr.count(i => i >= 0) == 2);
    });
});

test('custom count on SealedArray counts elements based on condition', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<number, 4> = [50, 20, -10, -25].toSealedArray();
        t.assert(arr.count(i => i >= 0) === 2);
    });
});

test('custom first on SealedArray returns the first element that satisfies the condition', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<number, 4> = [50, 20, -10, -25].toSealedArray();
        const res: number | null = arr.first(i => i == 20);
        t.assert(!!res && res === 20);
    });
});

test('first on array returns the first element when no condition is provided', (t) => {
    t.notThrows(() => {
        const arr: number[] = [50, 20, -10, -25];
        const res: number | null = arr.first();
        t.assert(!!res && res === 50);
    });
});

test('custom first on SealedArray returns the first element when no condition is provided', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<number, 4> = [50, 20, -10, -25].toSealedArray();
        const res: number | null = arr.first();
        t.assert(!!res && res === 50);
    });
});


test('last on array returns the last element that satisfies the condition', (t) => {
    t.notThrows(() => {
        const arr: number[] = [50, 20, -10, -25];
        const res: number | null = arr.last(i => i == -10);
        t.assert(!!res && res === -10);
    });
});

test('custom last on SealedArray returns the last element that satisfies the condition', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<number, 4> = [50, 20, -10, -25].toSealedArray();
        const res: number | null = arr.last(i => i == -10);
        t.assert(!!res && res === -10);
    });
});

test('last on array returns the last element when no condition is provided', (t) => {
    t.notThrows(() => {
        const arr: number[] = [50, 20, -10, -25];
        const res: number | null = arr.last();
        t.assert(!!res && res === -25);
    });
});

test('custom last on SealedArray returns the last element when no condition is provided', (t) => {
    t.notThrows(() => {
        const arr: SealedArray<number, 4> = [50, 20, -10, -25].toSealedArray();
        const res: number | null = arr.last();
        t.assert(!!res && res === -25);
    });
});