import { ReturnIsTrue } from '../returns';

/**
 * Interface for a SealedArray with elements of type T and a specified length L.
 *
 * @interface
 * @template T - The type of elements in the SealedArray.
 * @template L - The length of the SealedArray.
 */
export interface ISealedArray<T, L extends number> {
    /**
     * Getter for the length property of the SealedArray.
     *
     * @returns {L} The length of the SealedArray.
     */
    get length(): L;

    /**
     * Adds an element to the SealedArray.
     *
     * @param {T} x - The element to be added.
     * @throws {OutOfCapacityError} Throws an error if adding the element exceeds the capacity of the SealedArray.
     */
    add(x: T): void;

    /**
     * Attempts to add an element to the SealedArray.
     *
     * @param {T} x - The element to be added.
     * @returns {boolean} True if the element was successfully added, false if adding the element exceeds the capacity.
     */
    tryAdd(x: T): boolean;

    /**
     * Removes an element from the SealedArray.
     *
     * @param {T} x - The element to be removed.
     * @throws {ItemNotFoundError} Throws an error if the specified element is not found in the SealedArray.
     */
    remove(x: T): void;

    /**
     * Attempts to remove an element from the SealedArray.
     *
     * @param {T} x - The element to be removed.
     * @returns {boolean} True if the element was successfully removed, false if the element was not found.
     */
    tryRemove(x: T): boolean;

    /**
     * Removes the element at the specified index from the SealedArray.
     *
     * @param {number} x - The index of the element to be removed.
     * @throws {NotAnIntegerError} Throws an error if the provided index is not an integer.
     * @throws {OutOfRangeError} Throws an error if the provided index is out of range.
     * @throws {UnreachableException} Throws an error if the specified index is unreachable (tryRemoveAt unsuccessful).
     */
    removeAt(x: number): void;

    /**
     * Attempts to remove the element at the specified index from the SealedArray.
     *
     * @param {number} x - The index of the element to be removed.
     * @returns {boolean} True if the element at the specified index was successfully removed, false otherwise.
     */
    tryRemoveAt(x: number): boolean;

    /**
     * Sets the element at the specified index in the SealedArray.
     *
     * @param {number} n - The index where the element should be set.
     * @param {T} x - The element to be set at the specified index.
     * @throws {NotAnIntegerError} Throws an error if the provided index is not an integer.
     * @throws {OutOfRangeError} Throws an error if the provided index is out of range.
     * @throws {UnreachableException} Throws an error if setting the element at the specified index is unreachable (trySet unsuccessful).
     */
    set(n: number, x: T): void;

    /**
     * Attempts to set the element at the specified index in the SealedArray.
     *
     * @param {number} n - The index where the element should be set.
     * @param {T} x - The element to be set at the specified index.
     * @returns {boolean} True if setting the element at the specified index was successful, false otherwise.
     */
    trySet(n: number, x: T): boolean;

    /**
     * Gets the element at the specified index from the SealedArray.
     *
     * @param {number} n - The index of the element to be retrieved.
     * @throws {NotAnIntegerError} Throws an error if the provided index is not an integer.
     * @throws {OutOfRangeError} Throws an error if the provided index is out of range.
     * @throws {UnreachableException} Throws an error if getting the element at the specified index is unreachable (tryGet unsuccessful).
     * @returns {T} The element at the specified index.
     */
    get(n: number): T;

    /**
     * Attempts to get the element at the specified index from the SealedArray.
     *
     * @param {number} n - The index of the element to be retrieved.
     * @returns {[found: B, value: ReturnIsTrue<B, T, null>]} A tuple indicating whether the element was found and the retrieved value.
     * @template B - A boolean type indicating whether the element was found (true) or not (false).
     */
    tryGet<B extends boolean>(n: number): [found: B, value: ReturnIsTrue<B, T, null>];
}