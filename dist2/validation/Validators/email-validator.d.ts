import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid Internet email address as defined by RFC 5322, section 3.4.1, otherwise false
 */
export declare class EmailValidator implements IStringValidator {
    tagName: string;
    private emailRegexp;
    isAcceptable(s: string): boolean;
}
