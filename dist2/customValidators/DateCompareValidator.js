"use strict";
var moment = require('moment');
var _ = require('underscore');
var Validation = require('../validation/Validation');
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
var DateCompareValidator = (function () {
    function DateCompareValidator() {
        /**
         * It forces to ignore time part of date by date compare.
         */
        this.IgnoreTime = false;
        this.tagName = 'dateCompare';
    }
    DateCompareValidator.prototype.isAcceptable = function (s) {
        var isValid = false;
        // if date to compare is not specified - defaults to compare against now
        if (!_.isDate(s))
            return false;
        if (this.CompareTo === undefined)
            Date.now();
        var now = moment(this.CompareTo);
        var then = moment(s);
        var diffs = then.diff(now);
        if (this.IgnoreTime)
            diffs = moment.duration(diffs).days();
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
    };
    return DateCompareValidator;
}());
module.exports = DateCompareValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/customValidators/DateCompareValidator.js.map