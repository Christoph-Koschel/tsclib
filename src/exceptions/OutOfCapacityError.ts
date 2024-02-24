/**
 * Error class representing an attempt to add an item to a buffer exceeding its capacity.
 *
 * @class
 * @extends Error
 */
export class OutOfCapacityError extends Error {
    /**
     * Creates an instance of OutOfCapacityError.
     *
     * @constructor
     * @param {string} [message] - Additional information about the error.
     */
    public constructor(message?: string) {
        super(message || 'The buffer has no capacity to add a new item.');
    }
}