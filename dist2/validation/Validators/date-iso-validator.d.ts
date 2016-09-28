import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
 */
export declare class DateISOValidator implements IStringValidator {
    tagName: string;
    isAcceptable(s: string): boolean;
}
