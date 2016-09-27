import { MinimalDefaultValue } from './min-length-validator';
import { MaximalDefaultValue } from './max-length-validator';
import { IPropertyValidator } from './../Validation/interfaces';
import * as _ from 'underscore';

/**
 * Return true if value is between Min and Max property.
 *
 *  @require underscore
 */
export class RangeValidator implements IPropertyValidator {

  tagName = 'range';
  /**
   * Default constructor.
   * @param Range - array [the value of 'minimum', the value of 'maximum']
   */
  constructor(public Range?: Array<number>) {
    if (Range === undefined) {
      this.Range = [MinimalDefaultValue, MaximalDefaultValue]
    };
  }

  isAcceptable(s: any) {
    if (!_.isNumber(s)) {
      s = parseFloat(s);
    }
    return s >= this.Min && s <= this.Max;
  }

  /**
   * Return the value of 'minimum'
   * @returns {number}
   */
  public get Min(): number {
    return this.Range[0];
  }

  /**
   * Return the value of 'maximum'
   * @returns {number}
   */
  public get Max(): number {
    return this.Range[1];
  }

}
