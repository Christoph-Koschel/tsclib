/**
 * Error class representing a situation where the program executed an instruction
 * that was thought to be unreachable.
 *
 * @class
 * @extends Error
 */
export class UnreachableException extends Error {
    public constructor() {
        super('The program executed an instruction that was thought to be unreachable.');
    }
}