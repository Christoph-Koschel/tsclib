/**
 * Interface representing a provider for LINQ-like query methods.
 *
 * @interface
 * @template T - The type of elements provided by the LINQ provider.
 */
export interface ILINQProvider<T> {
    /**
     * Gets all items provided by the LINQ provider.
     *
     * @returns {T[]} An array containing all items provided by the LINQ provider.
     */
    getLINQItems(): T[];
}
