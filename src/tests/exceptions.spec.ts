import test from 'ava';
import { UnreachableException } from '../index';

test('throws UnreachableException', (t) => {
    t.throws(() => {
        throw new UnreachableException();
    });
});