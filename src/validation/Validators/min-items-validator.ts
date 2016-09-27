import { IPropertyValidator } from './../Validation/interfaces';
import { MinimalDefaultValue } from './min-length-validator';
import * as _ from 'underscore';

/**
    * Return true if the number of items in array is lower or equal to the value of "minimum".
    *
    *  @require underscore
    */
export class MinItemsValidator implements IPropertyValidator {

  tagName = 'minItems';

  /**
   * Default constructor.
   * @param Max - the value of "minimum"
   */
  constructor(public Min?: number) {
    if (Min === undefined) {
      this.Min = MinimalDefaultValue;
    }
  }

  isAcceptable(s: any) {
    if (_.isArray(s)) {
      return s.length >= this.Min;
    }
    return false;
  }

}
