import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
 */
export declare class DateValidator implements IStringValidator {
    tagName: string;
    isAcceptable(s: string): boolean;
}
