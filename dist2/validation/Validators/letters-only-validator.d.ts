import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid string letter representation, otherwise false.
 */
export declare class LettersOnlyValidator implements IStringValidator {
    private lettersRegexp;
    tagName: string;
    isAcceptable(s: string): boolean;
}
