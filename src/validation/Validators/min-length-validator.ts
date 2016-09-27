import { IStringValidator } from './../Validation/interfaces';


export const MinimalDefaultValue = 0;

/**
 * Return true if string length is greater or equal to MinLength property.
 */
export class MinLengthValidator implements IStringValidator {

  tagName = 'minlength';

  /**
   * Default constructor
   * @param MinLength - minimal number of characters.
   */
  constructor(public MinLength?: number) {
    if (MinLength === undefined) {
      this.MinLength = MinimalDefaultValue;
    }
  }

  isAcceptable(s: string) {
    return s.length >= this.MinLength;
  }

}
