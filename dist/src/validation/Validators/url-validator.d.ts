import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid URI, according to [RFC3986], otherwise false.
 */
export declare class UrlValidator implements IStringValidator {
    tagName: string;
    private urlRegexp;
    isAcceptable(s: string): boolean;
}
