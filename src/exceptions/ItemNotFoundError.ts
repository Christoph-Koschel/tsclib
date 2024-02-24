/**
 * Error class representing an item not found in a list or map.
 *
 * @class
 * @extends Error
 * @template T - Type of the item that could not be found.
 */
export class ItemNotFoundError<T> extends Error {
    /**
     * Creates an instance of ItemNotFoundError.
     *
     * @param {T} item - The item that could not be found.
     */
    public constructor(n: T) {
        let itemString = !!n && typeof n == 'object' ? n.toString() : n;
        super(`The Item '${itemString}' could not be found in the list/map`);
    }
}