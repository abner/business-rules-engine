import * as _ from 'underscore';
import { IPropertyValidator } from '../Validation/interfaces';
/**
 * Return true if a numeric instance is valid against 'multipleOf' if the result of the division of the instance by this keyword's value is an integer, otherwise false.
 *
 *  @require underscore
 */
export class MultipleOfValidator implements IPropertyValidator {
  tagName = 'multipleOf';
  private MultipleOfDefaultValue = 1;

  /**
   * Default constructor
   * @param Divider
   */
  constructor(public Divider?: number) {
    if (Divider === undefined) this.Divider = this.MultipleOfDefaultValue;
  }

  isAcceptable(s: any) {
    if (!_.isNumber(s)) return false;
    return (s % this.Divider) % 1 === 0;
  }

}
