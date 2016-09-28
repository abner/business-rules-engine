import { IPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
export declare class TypeValidator implements IPropertyValidator {
    Type: string;
    tagName: string;
    /**
     * Default constructor.
     * @param Type - keywords that defines an concrete type
     */
    constructor(Type: string);
    isAcceptable(s: any): boolean;
}
