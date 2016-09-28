import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid digit representation, otherwise false.
 */
export declare class DigitValidator implements IStringValidator {
    tagName: string;
    isAcceptable(s: string): boolean;
}
