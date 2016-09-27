
import { IPropertyValidator } from './../Validation/interfaces';
import * as _ from 'underscore';

/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 *
 *  @require underscore
 */
export class EnumValidator implements IPropertyValidator {

  tagName = 'enum';

  /**
   * Default constructor.
   * @param Enum - array of values
   */
  constructor(public Enum?: Array<number>) {
    if (Enum === undefined) {
      this.Enum = [];
    }
  }

  isAcceptable(s: any) {
    return _.contains(this.Enum, s);
  }
}
