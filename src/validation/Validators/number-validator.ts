import { IStringValidator } from '../Validation/interfaces';
/**
* Return true if it is a valid number representation, otherwise false.
*/
export class NumberValidator implements IStringValidator {
  tagName = 'number';

  isAcceptable(s: string) {
    return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
  }

}
