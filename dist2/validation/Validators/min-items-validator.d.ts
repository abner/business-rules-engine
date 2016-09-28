import { IPropertyValidator } from './../Validation/interfaces';
/**
    * Return true if the number of items in array is lower or equal to the value of "minimum".
    *
    *  @require underscore
    */
export declare class MinItemsValidator implements IPropertyValidator {
    Min: number;
    tagName: string;
    /**
     * Default constructor.
     * @param Max - the value of "minimum"
     */
    constructor(Min?: number);
    isAcceptable(s: any): boolean;
}
