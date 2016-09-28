import { IStringValidator } from './../Validation/interfaces';
export declare const MinimalDefaultValue: number;
/**
 * Return true if string length is greater or equal to MinLength property.
 */
export declare class MinLengthValidator implements IStringValidator {
    MinLength: number;
    tagName: string;
    /**
     * Default constructor
     * @param MinLength - minimal number of characters.
     */
    constructor(MinLength?: number);
    isAcceptable(s: string): boolean;
}
