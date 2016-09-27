import { IPropertyValidator } from './../Validation/interfaces';
import { MaximalDefaultValue } from './max-length-validator';

import * as _ from 'underscore';

/**
 * Return true if an number of items in array is greater or equal to the value of 'maximum'.
 *
 *  @require underscore
 */
export class MaxItemsValidator implements IPropertyValidator {

  tagName = 'maxItems';

  /**
   * Default constructor.
   * @param Max - the value of 'maximum'
   */
  constructor(public Max?: number) {
    if (Max === undefined) {
      this.Max = MaximalDefaultValue;
    }
  }

  isAcceptable(s: any) {
    if (_.isArray(s)) {
      return s.length <= this.Max;
    }
    return false;
  }

}
