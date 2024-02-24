import {
    ILINQProvider,
    COUNT_FUNCTION,
    FIRST_FUNCTION, LAST_FUNCTION,
    SELECT_FUNCTION,
    SELECT_MANY_FUNCTION,
    UNTIL_FUNCTION,
    WHERE_FUNCTION
} from '../index';

/**
 * LINQ-like select method for transforming elements using a callback function.
 *
 * @param {SELECT_FUNCTION<B, R>} cb - The function to transform each element.
 * @param {ILINQProvider<B> | B[]} caller - The source of elements for the operation, either an ILINQProvider or an array.
 * @returns {R[]} An array containing the transformed elements.
 * @template B - The type of elements provided by the LINQ provider.
 * @template R - The type of the resulting elements after transformation.
 */
export function select<B, R>(cb: SELECT_FUNCTION<B, R>, caller: ILINQProvider<B> | B[]): R[] {
    const result: R[] = [];

    (Array.isArray(caller) ? caller : caller.getLINQItems()).forEach((item, index) => {
        result.push(cb(item, index));
    });

    return result;
}

/**
 * LINQ-like selectMany method for flattening arrays resulting from a transformation function.
 *
 * @param {SELECT_MANY_FUNCTION<B, R>} cb - The function to transform each element into an array.
 * @param {ILINQProvider<B> | B[]} caller - The source of elements for the operation, either an ILINQProvider or an array.
 * @returns {R[]} An array containing the flattened elements.
 * @template B - The type of elements provided by the LINQ provider.
 * @template R - The type of the resulting elements after transformation.
 */
export function selectMany<B, R>(cb: SELECT_MANY_FUNCTION<B, R>, caller: ILINQProvider<B> | B[]): R[] {
    const result: R[] = [];
    (Array.isArray(caller) ? caller : caller.getLINQItems()).forEach((item, index) => {
        result.push(...cb(item, index));
    });

    return result;
}

export function where<B>(cb: WHERE_FUNCTION<B>, caller: ILINQProvider<B> | B[]): B[] {
    const result: B[] = [];
    (Array.isArray(caller) ? caller : caller.getLINQItems()).forEach((item, index) => {
        if (cb(item, index)) {
            result.push(item);
        }
    });

    return result;
}

/**
 * LINQ-like where method for filtering elements based on a condition.
 *
 * @param {WHERE_FUNCTION<B>} cb - The function that tests each element for a condition.
 * @param {ILINQProvider<B> | B[]} caller - The source of elements for the operation, either an ILINQProvider or an array.
 * @returns {B[]} An array containing the elements that satisfy the condition.
 * @template B - The type of elements provided by the LINQ provider.
 */
export function until<B>(cb: UNTIL_FUNCTION<B>, caller: ILINQProvider<B> | B[]): B[] {
    const result: B[] = [];
    let index: number = 0;
    for (const item of (Array.isArray(caller) ? caller : caller.getLINQItems())) {
        if (cb(item, index)) {
            break;
        }
        result.push(item);

        index++;
    }

    return result;
}

/**
 * LINQ-like count method for counting elements that satisfy a condition.
 *
 * @param {COUNT_FUNCTION<B>} cb - The function that tests each element for the condition.
 * @param {ILINQProvider<B> | B[]} caller - The source of elements for the operation, either an ILINQProvider or an array.
 * @returns {number} The count of elements that satisfy the condition.
 * @template B - The type of elements provided by the LINQ provider.
 */
export function count<B>(cb: COUNT_FUNCTION<B>, caller: ILINQProvider<B> | B[]): number {
    let counter: number = 0;

    (Array.isArray(caller) ? caller : caller.getLINQItems()).forEach((item, index) => {
        if (cb(item, index)) {
            counter++;
        }
    });

    return counter;
}

/**
 * LINQ-like first method for retrieving the first element that satisfies a condition.
 *
 * @param {FIRST_FUNCTION<B> | null} cb - The function that tests each element for the condition, or null for the first element.
 * @param {ILINQProvider<B> | B[]} caller - The source of elements for the operation, either an ILINQProvider or an array.
 * @returns {B | null} The first element that satisfies the condition, or null if none is found.
 * @template B - The type of elements provided by the LINQ provider.
 */
export function first<B>(cb: FIRST_FUNCTION<B> | null, caller: ILINQProvider<B> | B[]): B | null {
    const items: B[] = (Array.isArray(caller) ? caller : caller.getLINQItems());

    if (!cb) {
        return items[0];
    }

    let index: number = 0;

    for (const item of items) {
        if (cb(item, index)) {
            return item;
        }
    }

    return null;
}

/**
 * LINQ-like last method for retrieving the last element that satisfies a condition.
 *
 * @param {LAST_FUNCTION<B> | null} cb - The function that tests each element for the condition, or null for the last element.
 * @param {ILINQProvider<B> | B[]} caller - The source of elements for the operation, either an ILINQProvider or an array.
 * @returns {B | null} The last element that satisfies the condition, or null if none is found.
 * @template B - The type of elements provided by the LINQ provider.
 */
export function last<B>(cb: LAST_FUNCTION<B> | null, caller: ILINQProvider<B> | B[]): B | null {
    const items: B[] = (Array.isArray(caller) ? caller : caller.getLINQItems());

    if (!cb) {
        return items[items.length - 1];
    }

    let index: number = 0;
    let lastItem: B | null = null;

    for (const item of items) {
        if (cb(item, index)) {
            lastItem = item;
        }
    }

    return lastItem;
}