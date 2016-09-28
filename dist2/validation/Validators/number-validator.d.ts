import { IStringValidator } from '../Validation/interfaces';
/**
* Return true if it is a valid number representation, otherwise false.
*/
export declare class NumberValidator implements IStringValidator {
    tagName: string;
    isAcceptable(s: string): boolean;
}
