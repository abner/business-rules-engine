import { IStringValidator } from './../Validation/interfaces';

/**
 * Return true if it is a valid string letter representation, otherwise false.
 */
export class LettersOnlyValidator implements IStringValidator {
  private lettersRegexp = /^[A-Za-z]+$/;
  tagName = 'lettersonly';

  isAcceptable(s: string) {
    return this.lettersRegexp.test(s);
  }

}

