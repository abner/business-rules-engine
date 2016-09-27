import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
 */
export class DateValidator implements IStringValidator {
  tagName = 'date';

  isAcceptable(s: string) {
    return !/Invalid|NaN/.test(new Date(s).toString());
  }

}
