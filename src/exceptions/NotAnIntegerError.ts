/**
 * Error class representing an unexpected non-integer value.
 *
 * @class
 * @extends Error
 */
export class NotAnIntegerError extends Error {
    /**
     * Creates an instance of NotAnIntegerError.
     *
     * @param {number} [value] - The non-integer value that caused the error.
     */
    public constructor(value?: number) {
        super(!!value ? `An Integer was expected but got '${value}'.` : 'An Integer was expected.');
    }
}