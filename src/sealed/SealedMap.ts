import {
    ISealedMap,
    IIterable,
    ReturnIsTrue,
    ForEachFunction,
    ItemNotFoundError,
    NotAnIntegerError,
    OutOfRangeError,
    UnreachableException,
    OutOfCapacityError, Integer
} from '../index';

export class SealedMap<K, V, L extends number> implements ISealedMap<K, V, L>, IIterable<V, K, SealedMap<K, V, L>> {
    private readonly _length: L;
    private readonly map: Map<K, V>;

    /**
     * Constructor for the SealedMap class.
     *
     * @constructor
     * @param {L} length - The specified length for the SealedMap.
     * @throws {NotAnIntegerError} Throws an error if the provided length is not an integer.
     */
    public constructor(length: L) {
        if (!Integer.isInt(length)) {
            throw new NotAnIntegerError(length);
        }

        this._length = length;
        this.map = new Map<K, V>();
    }

    // region IIterable

    forEach(cb: ForEachFunction<V, K, SealedMap<K, V, L>>): void {
        let keys: IterableIterator<K> = this.map.keys();
        let currentKey: IteratorResult<K>;
        do {
            currentKey = keys.next();
            cb(this.map.get(currentKey.value) as V, currentKey.value, this);
        } while (!currentKey.done);

    }

    [Symbol.iterator](): Iterator<V> {
        let keys: IterableIterator<K> = this.map.keys();
        return {
            next: function(): IteratorResult<V> {
                const res: IteratorResult<K> = keys.next();

                return {
                    done: res.done,
                    value: res.value
                };
            }.bind(this)
        };
    }

    // endregion
    // region ISealedMap

    get length(): L {
        return this._length;
    }

    remove(key: K): void {
        if (!this.tryRemove(key)) {
            throw new ItemNotFoundError(key);
        }
    }

    tryRemove(key: K): boolean {
        if (!this.map.has(key)) {
            return false;
        }
        this.map.delete(key);
        return true;
    }

    removeAt(x: number): void {
        if (!Integer.isInt(x)) {
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
        if (!Integer.isInt(x) || x < 0 || x >= this.length) {
            return false;
        }

        if (this.map.size < x) {
            return true;
        }

        const keys: K[] = Array.from(this.map.keys());
        this.map.delete(keys[x]);
        return true;
    }

    set(key: K, value: V): void {
        if (!this.trySet(key, value)) {
            throw new OutOfCapacityError();
        }
    }

    trySet(key: K, value: V): boolean {
        if (this.map.has(key)) {
            this.map.set(key, value);
            return true;
        }

        if (this.map.size + 1 > this.length) {
            return false;
        }

        this.map.set(key, value);
        return true;
    }

    get(key: K): V {
        const [found, value] = this.tryGet(key);
        if (!found) {
            throw new ItemNotFoundError(key);
        }
        return <V>value;

    }

    tryGet<B extends boolean>(key: K): [found: B, value: ReturnIsTrue<B, V, null>] {
        if (!this.map.has(key)) {
            return [false as B, null as ReturnIsTrue<B, V, null>];
        }
        return [true as B, this.map.get(key) as ReturnIsTrue<B, V, null>];
    }

    // endregion
}