import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is not empty value, otherwise false.
 */
export declare class RequiredValidator implements IStringValidator {
    tagName: string;
    isAcceptable(s: string): boolean;
}
