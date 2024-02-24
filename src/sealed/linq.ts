import { SealedArray } from './SealedArray';

Array.prototype.toSealedArray = function <L extends number>(): SealedArray<any, L> {
    const arr: SealedArray<any, L> = new SealedArray<any, L>(this.length as L);
    for (const item of this) {
        arr.add(item);
    }

    return arr;
};
export {};