import { IStringValidator } from './../Validation/interfaces';
/**
  * Return true if it is a valid zip code, otherwise false.
  */
export declare class ZipCodeValidator implements IStringValidator {
    private numberRegexp;
    tagName: string;
    isAcceptable(s: string): boolean;
}
