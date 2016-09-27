
/*
    It represents utility for number manipulation.
*/
export class NumberFce {
    static GetNegDigits(value:string):number {
        if (value === undefined) { return 0; };
        let digits = value.toString().split('.');
        if (digits.length > 1) {
            let negDigitsLength = digits[1].length;
            return negDigitsLength;
        }
        return 0;
    }
}
