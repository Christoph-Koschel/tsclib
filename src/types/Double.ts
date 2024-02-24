export class Double {
    /**
     * Rounds a number to a specified precision.
     *
     * @param x - The number to be rounded.
     * @param precision - The number of decimal places to round to. Must be non-negative.
     * @returns The rounded number.
     */
    public static round(x: number, precision: number): number {
        if (precision < 0) {
            return x;
        }
        let negative: boolean = x < 0;
        if (negative) x = -x;

        precision = Math.pow(10, precision);
        const res: number = Math.floor(x * precision) / precision;

        if (negative) {
            return -res;
        }

        return res;
    }
}