import { IStringValidator } from './../Validation/interfaces';


export const MaximalDefaultValue = 0;

/**
 * Return true if string length is less or equal to MaxLength property.
 */
export class MaxLengthValidator implements IStringValidator {

  tagName = 'maxlength';

  /**
   * Default constructor.
   * @param MaxLength - maximal number of characters.
   */
  constructor(public MaxLength?: number) {
    if (MaxLength === undefined) {
      this.MaxLength = MaximalDefaultValue;
    }
  }

  isAcceptable(s: string) {
    return s.length <= this.MaxLength;
  }

}
