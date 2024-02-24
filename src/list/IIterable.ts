/**
 * Type alias representing the signature of a forEach callback function.
 *
 * @type {ForEachFunction<V, I, B>}
 * @param {V} value - The current element being processed in the iteration.
 * @param {I} index - The index or key of the current element being processed.
 * @param {B} array - The iterable or array upon which forEach is called.
 * @returns {void}
 */
export type ForEachFunction<V, I, B> = (value: V, index: I, array: B) => void;

/**
 * Iterable interface with additional forEach method.
 *
 * @interface
 * @extends {Iterable<V>} - Built-in Iterable interface for iteration over values.
 * @template V - The type of elements in the iterable.
 * @template I - The type of index or key used during iteration.
 * @template B - The type of the iterable itself.
 */
export interface IIterable<V, I, B> extends Iterable<V> {
    /**
     * Executes a provided function once for each element in the iterable.
     *
     * @param {ForEachFunction<V, I, B>} cb - The function to execute for each element.
     */
    forEach(cb: ForEachFunction<V, I, B>): void;
}