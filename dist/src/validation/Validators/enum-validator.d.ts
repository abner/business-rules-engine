import { IPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 *
 *  @require underscore
 */
export declare class EnumValidator implements IPropertyValidator {
    Enum: Array<number>;
    tagName: string;
    /**
     * Default constructor.
     * @param Enum - array of values
     */
    constructor(Enum?: Array<number>);
    isAcceptable(s: any): boolean;
}
