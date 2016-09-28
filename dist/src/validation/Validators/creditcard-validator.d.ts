import { IStringValidator } from './../Validation/interfaces';
/**
* Return true if it is a valid Luhn card number based on http://en.wikipedia.org/wiki/Luhn/, otherwise false;
*/
export declare class CreditCardValidator implements IStringValidator {
    tagName: string;
    isAcceptable(value: string): boolean;
}
