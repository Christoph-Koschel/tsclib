import { ReturnIsTrue } from '../index';

/**
 * Interface for a SealedMap with keys of type K, values of type V, and a specified length L.
 *
 * @interface
 * @template K - The type of keys in the SealedMap.
 * @template V - The type of values in the SealedMap.
 * @template L - The length of the SealedMap.
 */
export interface ISealedMap<K, V, L extends number> {
    /**
     * Getter for the length property of the SealedMap.
     *
     * @returns {L} The length of the SealedMap.
     */
    get length(): L;

    /**
     * Removes the entry with the specified key from the SealedMap.
     *
     * @param {K} key - The key of the entry to be removed.
     * @throws {ItemNotFoundError} Throws an error if the specified key is not found in the SealedMap.
     */
    remove(key: K): void;

    /**
     * Attempts to remove the entry with the specified key from the SealedMap.
     *
     * @param {K} key - The key of the entry to be removed.
     * @returns {boolean} True if the entry with the specified key was successfully removed, false otherwise.
     */
    tryRemove(key: K): boolean;

    /**
     * Removes the entry at the specified index from the SealedMap.
     *
     * @param {number} x - The index of the entry to be removed.
     * @throws {NotAnIntegerError} Throws an error if the provided index is not an integer.
     * @throws {OutOfRangeError} Throws an error if the provided index is out of range.
     * @throws {UnreachableException} Throws an error if removing the entry at the specified index is unreachable (tryRemoveAt unsuccessful).
     */
    removeAt(x: number): void;

    /**
     * Attempts to remove the entry at the specified index from the SealedMap.
     *
     * @param {number} x - The index of the entry to be removed.
     * @returns {boolean} True if removing the entry at the specified index was successful, false otherwise.
     */
    tryRemoveAt(x: number): boolean;

    /**
     * Sets the value associated with the specified key in the SealedMap.
     *
     * @param {K} key - The key for which to set the value.
     * @param {V} value - The value to be set for the specified key.
     * @throws {OutOfCapacityError} Throws an error if setting the value exceeds the capacity of the SealedMap.
     */
    set(key: K, value: V): void;

    /**
     * Attempts to set the value associated with the specified key in the SealedMap.
     *
     * @param {K} key - The key for which to set the value.
     * @param {V} value - The value to be set for the specified key.
     * @returns {boolean} True if setting the value was successful, false otherwise.
     */
    trySet(key: K, value: V): boolean;

    /**
     * Gets the value associated with the specified key from the SealedMap.
     *
     * @param {K} key - The key for which to retrieve the value.
     * @throws {ItemNotFoundError} Throws an error if the specified key is not found in the SealedMap.
     * @returns {V} The value associated with the specified key.
     */
    get(key: K): V;

    /**
     * Attempts to get the value associated with the specified key from the SealedMap.
     *
     * @param {K} key - The key for which to attempt to retrieve the value.
     * @returns {[found: B, value: ReturnIsTrue<B, V, null>]} A tuple indicating whether the value was found and the retrieved value.
     * @template B - A boolean type indicating whether the value was found (true) or not (false).
     */
    tryGet<B extends boolean>(key: K): [found: B, value: ReturnIsTrue<B, V, null>];
}