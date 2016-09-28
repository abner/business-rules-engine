import { IPropertyValidator } from './../Validation/interfaces';
/**
     * Return true if a value is equal (using strict equal) to passed value, otherwise false.
     */
export declare class EqualToValidator implements IPropertyValidator {
    Value: any;
    tagName: string;
    /**
     *
     * @param Value
     */
    constructor(Value?: any);
    isAcceptable(s: any): boolean;
}
