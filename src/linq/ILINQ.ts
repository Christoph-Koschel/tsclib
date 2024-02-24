/**
 * Type alias representing the signature of a function used in the select method of ILINQ.
 *
 * @type {SELECT_FUNCTION<T, R>}
 * @param {T} item - The current element being processed in the select operation.
 * @param {number} index - The index of the current element being processed.
 * @returns {R} The result of transforming the current element.
 * @template T - The type of elements in the collection.
 * @template R - The type of the resulting elements after transformation.
 */
export type SELECT_FUNCTION<T, R> = (item: T, index: number) => R;

/**
 * Type alias representing the signature of a function used in the selectMany method of ILINQ.
 *
 * @type {SELECT_MANY_FUNCTION<T, R>}
 * @param {T} items - The current element being processed in the selectMany operation.
 * @param {number} index - The index of the current element being processed.
 * @returns {R[]} The resulting array after transforming the current element into an array.
 * @template T - The type of elements in the collection.
 * @template R - The type of the resulting elements after transformation.
 */
export type SELECT_MANY_FUNCTION<T, R> = (items: T, index: number) => R[];

/**
 * Type alias representing the signature of a function used in the where method of ILINQ.
 *
 * @type {WHERE_FUNCTION<T>}
 * @param {T} items - The current element being processed in the where operation.
 * @param {number} index - The index of the current element being processed.
 * @returns {boolean} True if the current element satisfies the condition, false otherwise.
 * @template T - The type of elements in the collection.
 */
export type WHERE_FUNCTION<T> = (items: T, index: number) => boolean;

/**
 * Type alias representing the signature of a function used in the until method of ILINQ.
 *
 * @type {UNTIL_FUNCTION<T>}
 * @param {T} items - The current element being processed in the until operation.
 * @param {number} index - The index of the current element being processed.
 * @returns {boolean} True if the condition is met, indicating the operation should stop, false otherwise.
 * @template T - The type of elements in the collection.
 */
export type UNTIL_FUNCTION<T> = (items: T, index: number) => boolean;

/**
 * Type alias representing the signature of a function used in the count method of ILINQ.
 *
 * @type {COUNT_FUNCTION<T>}
 * @param {T} items - The current element being processed in the count operation.
 * @param {number} index - The index of the current element being processed.
 * @returns {boolean} True if the current element satisfies the condition for counting, false otherwise.
 * @template T - The type of elements in the collection.
 */
export type COUNT_FUNCTION<T> = (items: T, index: number) => boolean;

/**
 * Type alias representing the signature of a function used in the first method of ILINQ.
 *
 * @type {FIRST_FUNCTION<T>}
 * @param {T} items - The current element being processed in the first operation.
 * @param {number} index - The index of the current element being processed.
 * @returns {boolean} True if the current element satisfies the condition for finding the first element, false otherwise.
 * @template T - The type of elements in the collection.
 */
export type FIRST_FUNCTION<T> = (items: T, index: number) => boolean;

/**
 * Type alias representing the signature of a function used in the last method of ILINQ.
 *
 * @type {LAST_FUNCTION<T>}
 * @param {T} items - The current element being processed in the last operation.
 * @param {number} index - The index of the current element being processed.
 * @returns {boolean} True if the current element satisfies the condition for finding the last element, false otherwise.
 * @template T - The type of elements in the collection.
 */
export type LAST_FUNCTION<T> = (items: T, index: number) => boolean;

/**
 * Interface providing LINQ-like query methods.
 *
 * @interface
 * @template T - The type of elements in the collection.
 */
export interface ILINQ<T> {
    /**
     * Projects each element of the collection into a new form.
     *
     * @param {SELECT_FUNCTION<T, R>} cb - The function to transform each element.
     * @template R - The type of the resulting elements.
     * @returns {R[]} An array containing the transformed elements.
     */
    select<R>(cb: SELECT_FUNCTION<T, R>): R[];

    /**
     * Projects each element of the collection to an array and flattens the resulting arrays into one array.
     *
     * @param {SELECT_FUNCTION<T, R[]>} cb - The function to transform each element into an array.
     * @template R - The type of the resulting elements.
     * @returns {R[]} An array containing the flattened elements.
     */
    selectMany<R>(cb: SELECT_MANY_FUNCTION<T, R>): R[];

    /**
     * Filters the elements of the collection based on a condition.
     *
     * @param {WHERE_FUNCTION<T>} cb - The function that tests each element for a condition.
     * @returns {T[]} An array containing the elements that satisfy the condition.
     */
    where(cb: WHERE_FUNCTION<T>): T[];

    /**
     * Returns elements from the collection until a specified condition is met.
     *
     * @param {UNTIL_FUNCTION<T>} cb - The function that tests each element until the condition is met.
     * @returns {T[]} An array containing the elements until the condition is met.
     */
    until(cb: UNTIL_FUNCTION<T>): T[];

    /**
     * Counts the number of elements in the collection that satisfy a condition.
     *
     * @param {COUNT_FUNCTION<T>} cb - The function that tests each element for the condition.
     * @returns {number} The count of elements that satisfy the condition.
     */
    count(cb: COUNT_FUNCTION<T>): number;

    /**
     * Returns the first element of the collection that satisfies a condition, or null if none is found.
     *
     * @param {FIRST_FUNCTION<T>} [cb] - The function that tests each element for the condition.
     * @returns {T|null} The first element that satisfies the condition, or null if none is found.
     */
    first(cb?: FIRST_FUNCTION<T>): T | null;

    /**
     * Returns the last element of the collection that satisfies a condition, or null if none is found.
     *
     * @param {LAST_FUNCTION<T>} [cb] - The function that tests each element for the condition.
     * @returns {T|null} The last element that satisfies the condition, or null if none is found.
     */
    last(cb?: LAST_FUNCTION<T>): T | null;
}