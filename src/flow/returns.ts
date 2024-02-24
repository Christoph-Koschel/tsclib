/**
 * Type alias for conditional type checking if type A is equal to type B.
 *
 * @type {ReturnAEqB<A, B, THEN, ELSE>}
 * @template A - The first type for comparison.
 * @template B - The second type for comparison.
 * @template THEN - The type to return if A is equal to B.
 * @template ELSE - The type to return if A is not equal to B.
 */
export type ReturnAEqB<A, B, THEN, ELSE> = A extends B ? THEN : ELSE;

/**
 * Type alias for conditional type checking if type A is not equal to type B.
 *
 * @type {ReturnANeqB<A, B, THEN, ELSE>}
 * @template A - The first type for comparison.
 * @template B - The second type for comparison.
 * @template THEN - The type to return if A is not equal to B.
 * @template ELSE - The type to return if A is equal to B.
 */
export type ReturnANeqB<A, B, THEN, ELSE> = ReturnAEqB<A, B, ELSE, THEN>;

/**
 * Type alias for conditional type checking if a boolean type is true.
 *
 * @type {ReturnIsTrue<A extends boolean, THEN, ELSE>}
 * @template A - The boolean type for checking.
 * @template THEN - The type to return if A is true.
 * @template ELSE - The type to return if A is false.
 */
export type ReturnIsTrue<A extends boolean, THEN, ELSE> = A extends true ? THEN : ELSE;
