/**
 * Error class representing an attempt to access an index outside the valid range.
 *
 * @class
 * @extends Error
 */
export class OutOfRangeError extends Error {
    /**
     * Creates an instance of OutOfRangeError.
     *
     * @constructor
     * @param {number} index - The index that was outside the valid range.
     * @param {number} length - The length or maximum allowed value.
     */
    public constructor(index: number, length: number) {
        super(`Index '${index}' was outside the valid range (0 to ${length}).`);
    }
}