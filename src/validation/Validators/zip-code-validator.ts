import { IStringValidator } from './../Validation/interfaces';
/**
  * Return true if it is a valid zip code, otherwise false.
  */
export class ZipCodeValidator implements IStringValidator {
  private numberRegexp = /^[0-9]+$/;
  tagName = 'zipcode';
  isAcceptable(s: string) {
    return s.length === 5 && this.numberRegexp.test(s);
  }
}
