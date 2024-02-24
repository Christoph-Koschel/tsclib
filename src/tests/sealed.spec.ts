import test from 'ava';
import { SealedArray, SealedMap } from '../index';

test('SealedArray instantiation is successful', (t) => {
    t.notThrows(() => {
        // @ts-ignore
        const arr: SealedArray<string, 20> = new SealedArray<string, 20>(20);
    });
});

test('SealedArray constructor throws error for non-integer length', (t) => {
    t.throws(() => {
        // @ts-ignore
        const arr: SealedArray<string, 20> = new SealedArray<string, 20>(1.1);
    });
});

test('Fill and retrieve elements from a SealedArray', (t) => {
    let arr: SealedArray<number, 10>;

    t.notThrows(() => {
        arr = new SealedArray<number, 10>(10);
        for (let i: number = 0; i < 10; i++) {
            arr.add(i);
        }

        for (let i = 0; i < 10; i++) {
            t.assert(i === arr.get(i));
        }
    });
});

test('SealedArray methods throw error for non-integer indices', (t) => {
    let arr: SealedArray<string, 10> = new SealedArray<string, 10>(10);

    t.throws(() => arr.get(2.2));
    t.throws(() => arr.set(2.2, 'Hallo'));
    t.throws(() => arr.removeAt(2.2));
});

test('SealedArray methods throw error for out-of-range indices', (t) => {
    let arr: SealedArray<string, 10> = new SealedArray<string, 10>(10);

    t.throws(() => arr.get(11));
    t.throws(() => arr.set(-11, 'Hallo'));
    t.throws(() => arr.removeAt(11));
    t.notThrows(() => {
        for (let i = 0; i < arr.length; i++) {
            arr.add('Should pass');
        }
    });
    t.throws(() => arr.add('Should Fail'));
});

test('SealedArray removes element at specified index', (t) => {
    const STR: string = 'Hallo Welt';
    let arr: SealedArray<string, 10> = new SealedArray<string, 10>(10);
    arr.set(0, STR);
    t.notThrows(() => {
        t.assert(arr.get(0) === STR);
        arr.removeAt(0);
        t.assert(typeof arr.get(0) === 'undefined');
    });
});

test('SealedArray throws error for removing non-existing item', (t) => {
    const STR: string = 'Hallo Welt';
    let arr: SealedArray<string, 10> = new SealedArray<string, 10>(10);
    arr.set(0, STR);

    t.notThrows(() => arr.remove(STR));
    t.throws(() => arr.remove(STR));
});

test('SealedArray implements IIterable correctly', (t) => {
    let arr: SealedArray<number, 10>;

    t.notThrows(() => {
        arr = new SealedArray<number, 10>(10);
        for (let i: number = 0; i < 10; i++) {
            arr.add(i);
        }

        let counter: number = 0;
        for (const item of arr) {
            t.assert(item === counter);
            counter++;
        }

        arr.forEach((value, index) => t.assert(value === index));
    });
});

test('SealedArray LINQ extension correctly converts array', (t) => {
    const template: number[] = [1, 2, 3, 4];
    t.notThrows(() => {
        const sealed: SealedArray<number, 4> = template.toSealedArray();

        t.assert(template.length === sealed.length);

        for (let i = 0; i < sealed.length; i++) {
            t.assert(template[i] === sealed.get(i));
        }
    });
});

test('SealedMap instantiate successful', (t) => {
    t.notThrows(() => {
        // @ts-ignore
        const map: SealedMap<string, number, 5> = new SealedMap<string, number, 5>(5);
    });
});

test('SealedMap instantiation is successful', (t) => {
    t.notThrows(() => {
        // @ts-ignore
        const map: SealedMap<string, number, 5> = new SealedMap<string, number, 5>(5);
    });
});

test('Fill and retrieve elements from a SealedMap', (t) => {
    let map: SealedMap<string, number, 5>;
    t.notThrows(() => {
        map = new SealedMap<string, number, 5>(5);
        for (let i: number = 0; i < 5; i++) {
            map.set('L' + i, i);
        }

        for (let i: number = 0; i < 5; i++) {
            t.assert(i === map.get('L' + i));
        }
    });
});

test('SealedMap throws error for non-integer key in removeAt', (t) => {
    let map: SealedMap<string, number, 5> = new SealedMap<string, number, 5>(5);
    t.throws(() => map.removeAt(2.2));
});

test('SealedMap throws error for out-of-range key in removeAt', (t) => {
    let map: SealedMap<string, string, 5> = new SealedMap<string, string, 5>(5);

    t.throws(() => map.removeAt(50));
});

test('SealedMap detects non-existing item and handles valid operations', (t) => {
    let map: SealedMap<string, string, 5> = new SealedMap<string, string, 5>(5);

    t.throws(() => map.get('11'));

    t.notThrows(() => {
        for (let i = 0; i < map.length; i++) {
            map.set(i.toString(), 'Should pass');
        }
    });

    t.throws(() => map.set(map.length.toString(), 'Should fail'));
});


test('SealedMap successfully adds and removes items', (t) => {
    let map: SealedMap<string, string, 5> = new SealedMap<string, string, 5>(5);

    t.notThrows(() => map.set('Hello', 'World'));
    t.notThrows(() => map.get('Hello'));
    t.notThrows(() => map.remove('Hello'));
    t.throws(() => map.get('Hello'));

    t.notThrows(() => map.set('Hello', 'World'));
    t.notThrows(() => map.removeAt(0));
    t.throws(() => map.get('Hello'));
});

test('SealedMap successfully overrides existing key-value pair', (t) => {
    let map: SealedMap<string, string, 5> = new SealedMap<string, string, 5>(5);

    t.notThrows(() => map.set('Hello', 'World'));
    t.notThrows(() => t.assert(map.get('Hello') == 'World'));

    t.notThrows(() => map.set('Hello', 'Foo'));
    t.notThrows(() => t.assert(map.get('Hello') == 'Foo'));
});

test('SealedMap implements IIterable with correct iteration', (t) => {
    let map: SealedMap<number, number, 5> = new SealedMap<number, number, 5>(5);

    t.notThrows(() => {
        for (let i: number = 0; i < 5; i++) {
            map.set(i, i);
        }

        let counter: number = 0;
        for (const item of map) {
            t.assert(item == counter);
            counter++;
        }

        map.forEach((value, key) => t.assert(value == key));
    });
});