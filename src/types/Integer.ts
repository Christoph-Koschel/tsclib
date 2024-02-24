import { isInt, NotAnIntegerError } from '../index';

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
        if (!isInt(min)) {
            throw new NotAnIntegerError(min);
        }
        if (!isInt(max)) {
            throw new NotAnIntegerError(max);
        }

        return Math.floor(Math.random() * (max - min)) + min;
    }
}