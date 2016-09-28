import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid positive or negative digit representation, otherwise false.
 */
export declare class SignedDigitValidator implements IStringValidator {
    tagName: string;
    isAcceptable(s: string): boolean;
}
