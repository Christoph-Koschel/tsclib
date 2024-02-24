import { NotAnIntegerError } from '../index';

export class Integer {
    /**
     * Generates a random integer within the specified range [min, max).
     *
     * @param min - The minimum value of the range (inclusive).
     * @param max - The maximum value of the range (exclusive).
     * @throws {NotAnIntegerError} Throws an error if either min or max is not an integer.
     * @returns A random integer within the specified range.
     */
    public static random(min: number, max: number): number {
        if (!this.isInt(min)) {
            throw new NotAnIntegerError(min);
        }
        if (!this.isInt(max)) {
            throw new NotAnIntegerError(max);
        }

        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Checks if a given number is an integer.
     *
     * @param {number} n - The number to be checked.
     * @returns {boolean} True if the number is an integer, false otherwise.
     */
    public static isInt(n: number): boolean {
        return Number.isInteger(n);
    }
}