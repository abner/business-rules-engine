import { IStringValidator } from './../Validation/interfaces';



/**
 * Return true if it is not empty value, otherwise false.
 */
export class RequiredValidator implements IStringValidator {
  tagName = 'required';
  isAcceptable(s: string) {
    return s !== undefined && s !== '' && s !== null;
  }

}
