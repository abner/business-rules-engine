import { IPropertyValidator } from './../Validation/interfaces';
import * as _ from 'underscore';

/**
     * Return true if the array contains unique items (using strict equality), otherwise false.
     *
     *  @require underscore
     */
export class UniqItemsValidator implements IPropertyValidator {

  tagName = 'uniqItems';

  isAcceptable(s: any) {
    if (_.isArray(s)) {
      return _.uniq(s).length === s.length;
    }
    return false;
  }

}
