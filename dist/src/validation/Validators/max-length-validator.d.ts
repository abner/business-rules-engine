import { IStringValidator } from './../Validation/interfaces';
export declare const MaximalDefaultValue: number;
/**
 * Return true if string length is less or equal to MaxLength property.
 */
export declare class MaxLengthValidator implements IStringValidator {
    MaxLength: number;
    tagName: string;
    /**
     * Default constructor.
     * @param MaxLength - maximal number of characters.
     */
    constructor(MaxLength?: number);
    isAcceptable(s: string): boolean;
}
