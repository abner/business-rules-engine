import { CompareOperator } from './../../src/validation/Validation/enums';
/**
 * Created by rsamec on 9.7.2014.
 */
let expect = require('expect.js');
import dateCompareValidator = require('../../src/customValidators/DateCompareValidator');
import moment = require('moment');

describe('DateCompareValidator', function () {

    describe('isAcceptable', function () {
        let params = [
            // less more than month
            { input: new Date(2000, 1, 1), result: true},
            // less more than day
            { input: new Date(2000, 2, 1), result: true},
            // equal up to days
            { input: new Date(2000, 2, 2), result: true },
            // equal up to miliseconds
            { input: new Date(2000, 2, 2, 0, 0, 0, 0), result: true  },
            // greater about 1 milisecond
            { input: new Date(2000, 2, 2, 0, 0, 0, 1), result: false },
            // equal up to miliseconds
            { input: new Date(2000, 2, 2, 0, 0, 0, 0), result: true, ignoreTime: true },
            // greater about 1 milisecond
            { input: new Date(2000, 2, 2, 0, 0, 0, 1), result: true, ignoreTime: true },
            // greater about max hours
            { input: new Date(2000, 2, 2, 23, 59, 59, 99), result: true, ignoreTime: true },
            // greater about one day
            { input: new Date(2000, 2, 3, 0, 0, 0, 0), result: false, ignoreTime: true },
            // bad date
            { input: '', result: false },
            // bad date
            { input: undefined, result: false },
            // bad date
            { input: '{}', result: false },
            // bad date
            { input: 'fasdfa', result: false }
        ];

        let validator = new dateCompareValidator();
        validator.CompareTo = new Date(2000, 2, 2);
        validator.CompareOperator = CompareOperator.LessThanEqual;

        for (let op in params) {
            (function (item) {
                it('should check date ' + item.input + ' is less then or equal -> ' + item.result, function () {
                    if (item['ignoreTime'] !== undefined) validator.IgnoreTime = item['ignoreTime'];
                    expect(item.result).to.equal(validator.isAcceptable(item.input));
                });
            })(params[op]);
        }

    });
});
