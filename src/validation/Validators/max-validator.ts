import { IPropertyValidator } from './../Validation/interfaces';
import { MaximalDefaultValue } from './max-length-validator';
import * as _ from 'underscore';

/**
     * Return true only for these conditions
     * if 'Exclusive' is false, then the instance is valid if it is lower than, or equal to, the value of 'maximum';
     * if 'Exclusive' is true, the instance is valid if it is strictly lower than the value of 'maximum'.
     *
     *  @require underscore
     */
export class MaxValidator implements IPropertyValidator {

  tagName = 'max';

  /**
   * Default constructor
   * @param Max - the value of 'maximum'
   * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of 'maximum';
   */
  constructor(public Max?: number, public Exclusive?: boolean) {
    if (Max === undefined) {
      this.Max = MaximalDefaultValue;
    }
  }

  isAcceptable(s: any) {
    if (!_.isNumber(s)) {
      s = parseFloat(s);
    }

    return this.Exclusive ? (s < this.Max) : (s <= this.Max);
  }

}
