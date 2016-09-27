import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid positive or negative digit representation, otherwise false.
 */
export class SignedDigitValidator implements IStringValidator {
  tagName = 'signedDigit';
  isAcceptable(s: string) {
    return /^-?\d+$/.test(s);
  }

}
