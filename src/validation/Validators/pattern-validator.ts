import { IStringValidator } from './../Validation/interfaces';

/**
 * Return true if an value is valid against specified pattern, otherwise false.
 */
export class PatternValidator implements IStringValidator {

  tagName = 'pattern';

  /**
   * Default constructor.
   * @param Pattern - pattern
   */
  constructor(public Pattern?: string) {
  }

  isAcceptable(s: string) {
    return new RegExp(this.Pattern).test(s);
  }

}
