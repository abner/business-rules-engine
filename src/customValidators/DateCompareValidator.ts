import moment = require('moment');
import * as _ from 'underscore';
import * as Validation from '../validation/Validation';

/**
* @ngdoc object
* @name DateCompareValidator
*
* @requires moment
* @requires underscore
*
* @description
* DateCompareValidator enables to compare date to another date (CompareTo).
*
* @property CompareTo
* The datetime against the compare is done.
* If  property is not set, then comparison is done against actual datetime.
*
* @property IgnoreDate
* It forces to ignore time part of date by date compare.
*
*
* @example
* ```typescript
*
*  //create validator
*  let validator = new dateCompareValidator();
*  validator.CompareTo = new Date(2000,2,2);
*  validator.CompareOperator = Validation.CompareOperator.LessThanEqual;
*
*
*  //less more than month -> return true
*  let result = validator.isAcceptable(new Date(2000,1,1));
*  //equal up to days -> return true
*  let result = validator.isAcceptable(new Date(2000,2,2));
*
* ```
*
*/
class DateCompareValidator implements Validation.IPropertyValidator {

  public isAcceptable(s: any) {
    let isValid = false;

    // if date to compare is not specified - defaults to compare against now
    if (!_.isDate(s)) return false;

    if (this.CompareTo === undefined) Date.now();

    let now = moment(this.CompareTo);
    let then = moment(s);

    let diffs: number = then.diff(now);
    if (this.IgnoreTime) diffs = moment.duration(diffs).days();

    if (diffs < 0) {
      isValid = this.CompareOperator === Validation.CompareOperator.LessThan
        || this.CompareOperator === Validation.CompareOperator.LessThanEqual
        || this.CompareOperator === Validation.CompareOperator.NotEqual;
    }
    else if (diffs > 0) {
      isValid = this.CompareOperator === Validation.CompareOperator.GreaterThan
        || this.CompareOperator === Validation.CompareOperator.GreaterThanEqual
        || this.CompareOperator === Validation.CompareOperator.NotEqual;
    }
    else {
      isValid = this.CompareOperator === Validation.CompareOperator.LessThanEqual
        || this.CompareOperator === Validation.CompareOperator.Equal
        || this.CompareOperator === Validation.CompareOperator.GreaterThanEqual;
    }
    return isValid;
  }

  /**
   * Set the time of compare between passed date and CompareTo date.
   */
  public CompareOperator: Validation.CompareOperator;

  /**
   * The datetime against the compare is done.
   * If CompareTo is not set, then comparison is done against actual datetime.
   */
  public CompareTo: Date;

  /**
   * It forces to ignore time part of date by date compare.
   */
  public IgnoreTime: boolean = false;

  tagName = 'dateCompare';

  //    public getErrorMessage(localMessages:any) {
  //        let msg = '';
  //        let messages = localMessages[this.tagName];
  //
  //        let format:string = messages["Format"];
  //        if (format != undefined) {
  //            _.extend(this, {FormatedCompareTo: moment(this.CompareTo).format(format)})
  //        }
  //
  //        switch (this.CompareOperator) {
  //            case Validation.CompareOperator.LessThan:
  //                msg = messages["LessThan"];
  //                break;
  //            case Validation.CompareOperator.LessThanEqual:
  //                msg = messages["LessThanEqual"];
  //                break;
  //            case Validation.CompareOperator.Equal:
  //                msg =  messages["Equal"];
  //                break;
  //            case Validation.CompareOperator.NotEqual:
  //                msg =  messages["NotEqual"];
  //                break;
  //            case Validation.CompareOperator.GreaterThanEqual:
  //                msg =  messages["GreaterThanEqual"];
  //                break;
  //            case Validation.CompareOperator.GreaterThan:
  //                msg = messages["GreaterThan"];
  //                break;
  //        }
  //        return DateCompareValidator.format(msg.replace('CompareTo','FormatedCompareTo'),this);
  //    }
  //    tagName = 'dateCompare';
  //
  //    static format(s: string, args: any): string {
  //        let formatted = s;
  //        for (let prop in args) {
  //            let regexp = new RegExp('\\{' + prop + '\\}', 'gi');
  //            formatted = formatted.replace(regexp, args[prop]);
  //        }
  //        return formatted;
  //    }
}

export = DateCompareValidator;
