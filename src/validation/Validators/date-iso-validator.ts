import { IStringValidator } from './../Validation/interfaces';
/**
 * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
 */
export class DateISOValidator implements IStringValidator {
  tagName = 'dateISO';
  isAcceptable(s: string) {
    return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(s);
  }

}
