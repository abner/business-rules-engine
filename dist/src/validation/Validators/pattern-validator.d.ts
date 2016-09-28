import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if an value is valid against specified pattern, otherwise false.
 */
export declare class PatternValidator implements IStringValidator {
    Pattern: string;
    tagName: string;
    /**
     * Default constructor.
     * @param Pattern - pattern
     */
    constructor(Pattern?: string);
    isAcceptable(s: string): boolean;
}
