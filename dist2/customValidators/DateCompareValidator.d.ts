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
declare class DateCompareValidator implements Validation.IPropertyValidator {
    isAcceptable(s: any): boolean;
    /**
     * Set the time of compare between passed date and CompareTo date.
     */
    CompareOperator: Validation.CompareOperator;
    /**
     * The datetime against the compare is done.
     * If CompareTo is not set, then comparison is done against actual datetime.
     */
    CompareTo: Date;
    /**
     * It forces to ignore time part of date by date compare.
     */
    IgnoreTime: boolean;
    tagName: string;
}
export = DateCompareValidator;
