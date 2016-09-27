import * as _ from 'underscore';
import { IPropertyValidator } from './../Validation/interfaces';
import { MinimalDefaultValue } from './min-length-validator';

/**
 * Return true only for these conditions
 * if 'Exclusive' is false, then the instance is valid if it is greater than, or equal to, the value of 'minimum';
 * if 'Exclusive' is true, the instance is valid if it is strictly greater than the value of 'minimum'.
 *
 *  @require underscore
 */
export class MinValidator implements IPropertyValidator {

  tagName = 'min';

  /**
   * Default constructor.
   * @param Min - the value of 'minimum'
   * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of 'minimum';
   */
  constructor(public Min?: number, public Exclusive?: boolean) {
    if (Min === undefined) {
      this.Min = MinimalDefaultValue;
    }
  }

  isAcceptable(s: any) {
    if (!_.isNumber(s)) {
      s = parseFloat(s);
    }
    return this.Exclusive ? (s > this.Min) : (s >= this.Min);
  }

}
