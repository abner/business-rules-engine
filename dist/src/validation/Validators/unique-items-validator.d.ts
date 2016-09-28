import { IPropertyValidator } from './../Validation/interfaces';
/**
     * Return true if the array contains unique items (using strict equality), otherwise false.
     *
     *  @require underscore
     */
export declare class UniqItemsValidator implements IPropertyValidator {
    tagName: string;
    isAcceptable(s: any): boolean;
}
