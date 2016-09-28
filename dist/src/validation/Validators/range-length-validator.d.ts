import { IStringValidator } from './../Validation/interfaces';
/**
    * Return true if string length is between MinLength and MaxLength property.
    */
export declare class RangeLengthValidator implements IStringValidator {
    RangeLength: Array<number>;
    tagName: string;
    /**
     * Default constructor.
     * @param RangeLength - array [minimal number of characters, maximal number of characters]
     */
    constructor(RangeLength?: Array<number>);
    isAcceptable(s: string): boolean;
    readonly MinLength: number;
    readonly MaxLength: number;
}
