import { ILINQ, ISealed } from '../index';

declare global {
    /**
     * Interface extension for the built-in Array type, incorporating ILINQ and ISealed interfaces.
     *
     * @interface
     * @extends {ILINQ<T>} - Interface providing LINQ-like query methods for arrays.
     * @extends {ISealed<T>} - Interface representing a sealed array with specified methods.
     * @template T - The type of elements in the array.
     */
    interface Array<T> extends ILINQ<T>, ISealed<T> {

    }
}

export {};