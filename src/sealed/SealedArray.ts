import {
    ISealedArray,
    ForEachFunction,
    IIterable,
    isInt,
    ReturnAEqB,
    ReturnIsTrue,
    NotAnIntegerError,
    OutOfRangeError,
    OutOfCapacityError,
    ItemNotFoundError,
    UnreachableException,
    ILINQProvider,
    SELECT_FUNCTION,
    WHERE_FUNCTION,
    UNTIL_FUNCTION,
    COUNT_FUNCTION,
    select,
    selectMany,
    where,
    until,
    count, FIRST_FUNCTION, first, LAST_FUNCTION, last, ILINQ, SELECT_MANY_FUNCTION
} from '../index';

/**
 * SealedArray class implementing ISealedArray, IIterable, and ILINQBinding interfaces.
 *
 * @class
 * @implements {ISealedArray<T, L>} - Interface for a SealedArray with elements of type T and a specified length L.
 * @implements {IIterable<T, number, SealedArray<T, L>>} - Interface for an iterable collection with elements of type T and keys of type number.
 * @implements {ILINQProvider<T>} - Interface providing LINQ-like query methods for the SealedArray.
 * @template T - The type of elements in the SealedArray.
 * @template L - The length of the SealedArray.
 */
export class SealedArray<T, L extends number> implements ISealedArray<T, L>, IIterable<T, number, SealedArray<T, L>>, ILINQProvider<T>, ILINQ<T> {
    private readonly _length: L;
    private items: T[];

    /**
     * Constructor for the SealedArray class.
     *
     * @constructor
     * @param {L} length - The length of the SealedArray to be created.
     * @throws {NotAnIntegerError} Throws an error if the provided length is not an integer.
     */
    public constructor(length: L) {
        if (!isInt(length)) {
            throw new NotAnIntegerError(length);
        }
        this._length = length;
        this.items = [];
    }

    // region IIterable
    forEach(cb: ForEachFunction<T, number, SealedArray<T, L>>): void {
        for (let i: number = 0; i < this.length; i++) {
            cb(this.items[i], i, this);
        }
    }

    [Symbol.iterator](): Iterator<T> {
        let counter: number = 0;
        let _this: this = this;
        return {
            next: function(): IteratorResult<T> {
                return {
                    done: counter >= _this.length,
                    value: _this.items[counter++]
                };
            }
        };
    }

    // endregion
    // region ILINQProvider


    getLINQItems(): T[] {
        return this.items;
    }

    // endregion
    // region ILINQ


    select<R>(cb: SELECT_FUNCTION<T, R>): R[] {
        return select(cb, this);
    }

    selectMany<R>(cb: SELECT_MANY_FUNCTION<T, R>): R[] {
        return selectMany(cb, this);
    }

    where(cb: WHERE_FUNCTION<T>): T[] {
        return where(cb, this);
    }

    until(cb: UNTIL_FUNCTION<T>): T[] {
        return until(cb, this);
    }

    count(cb: COUNT_FUNCTION<T>): number {
        return count(cb, this);
    }

    first(cb?: FIRST_FUNCTION<T>): T | null {
        return first(cb ?? null, this);
    }

    last(cb?: LAST_FUNCTION<T>): T | null {
        return last(cb ?? null, this);
    }

    // endregion
    // region ISealedArray

    get length(): L {
        return this._length;
    }

    add(x: T): void {
        if (!this.tryAdd(x)) {
            throw new OutOfCapacityError();
        }
    }

    tryAdd(x: T): boolean {
        if (this.items.length + 1 > this.length) {
            return false;
        }
        this.items.push(x);
        return true;
    }

    remove(x: T): void {
        if (!this.tryRemove(x)) {
            throw new ItemNotFoundError(x);
        }
    }

    tryRemove(x: T): boolean {
        let oldLength: number = this.items.length;
        this.items = this.items.filter(v => v != x);
        return oldLength != this.items.length;
    }

    removeAt(x: number): void {
        if (!isInt(x)) {
            throw new NotAnIntegerError(x);
        }
        if (x < 0 || x >= this.length) {
            throw new OutOfRangeError(x, this.length);
        }
        if (!this.tryRemoveAt(x)) {
            throw new UnreachableException();
        }
    }

    tryRemoveAt(x: number): boolean {
        if (!isInt(x) || x < 0 || x >= this.length) {
            return false;
        }

        if (this.items.length < x) {
            return true;
        }
        this.items.splice(x, 1);
        return true;
    }

    set(n: number, x: T): void {
        if (!isInt(n)) {
            throw new NotAnIntegerError(n);
        }
        if (n < 0 || n >= this.length) {
            throw new OutOfRangeError(n, this.length);
        }
        if (!this.trySet(n, x)) {
            throw new UnreachableException();
        }
    }

    trySet(n: number, x: T): boolean {
        if (!isInt(n) || n < 0 || n >= this.length) {
            return false;
        }
        this.items[n] = x;
        return true;
    }

    get(n: number): T {
        if (!isInt(n)) {
            throw new NotAnIntegerError(n);
        }
        if (n < 0 || n >= this.length) {
            throw new OutOfRangeError(n, this.length);
        }
        const [found, value] = this.tryGet(n);
        if (!found) {
            throw new UnreachableException();
        }
        return <T>value;
    }

    tryGet<B extends boolean>(n: number): [found: B, value: ReturnIsTrue<B, T, null>] {
        if (!isInt(n) || n < 0 || n >= this.length) {
            return [false as B, null as ReturnAEqB<B, true, T, null>];
        }
        return [true as B, this.items[n] as ReturnAEqB<B, true, T, null>];
    }

    // endregion
}