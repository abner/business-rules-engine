import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid digit representation, otherwise false.
 */
export class DigitValidator implements IStringValidator {
  tagName = 'digit';

  isAcceptable(s: string) {
    return /^\d+$/.test(s);
  }
}
