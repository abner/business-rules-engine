import { IPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
export declare class TypeValidator implements IPropertyValidator {
    Type: string;
    tagName: string;
    private cnpjValidator;
    private cpfValidator;
    constructor(Type: string);
    isAcceptable(s: any): boolean;
}
