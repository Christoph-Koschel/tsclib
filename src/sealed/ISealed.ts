import { SealedArray } from './SealedArray';

/**
 * Interface for a Sealed Type that can be converted to a SealedArray with a specified length.
 *
 * @interface
 * @template T - The type of elements in the SealedArray.
 */
export interface ISealed<T> {
    /**
     * Converts the Sealed Type to a SealedArray with the specified length.
     *
     * @function
     * @template L - The length of the resulting SealedArray.
     * @returns {SealedArray<T, L>} The SealedArray with the specified length.
     */
    toSealedArray<L extends number>(): SealedArray<T, L>;
}