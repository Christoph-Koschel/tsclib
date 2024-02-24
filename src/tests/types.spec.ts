import test from 'ava';
import { Integer, Double } from '../index';

test('Integer.random generates random integers within specified range', (t) => {
    t.notThrows(() => {
        const MAX: number = 10;

        for (let i = 0; i < MAX; i++) {
            const res: number = Integer.random(0, i);
            t.assert(res >= 0 && res <= i);
        }
    });
});

test('Integer.random only accepts integer parameters', (t) => {
    t.throws(() => Integer.random(1.1, 2));
    t.throws(() => Integer.random(1, 2.2));
});

test('Double.round correctly rounds numbers to specified precision', (t) => {
    t.assert(Double.round(Math.PI, 2) === 3.14);
    t.assert(Double.round(Math.PI, 1) === 3.1);
    t.assert(Double.round(Math.PI, 0) === 3);

    t.assert(Double.round(-Math.PI, 2) === -3.14);
    t.assert(Double.round(-Math.PI, 1) === -3.1);
    t.assert(Double.round(-Math.PI, 0) === -3);

    t.assert(Double.round(Math.PI, -1) === Math.PI);
});