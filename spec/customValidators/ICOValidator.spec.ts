import { ICOValidator } from './../../src/customValidators/ICOValidator';
let expect = require('expect.js');
import icoValidator = require('../../src/customValidators/ICOValidator');

describe('ICOValidator', function () {

    let params = [
        { input: '70577200', result: true},
        { input: '3457890', result: false },
        { input: '7057720', result: false },
        { input: '45244782', result: true },
        { input: '25578898', result: true },
        { input: '61490041', result: true },
        { input: '11111111', result: false },
        { input: '12312312', result: true },
        { input: '', result: false },
        { input: undefined, result: false },
        { input: '{}', result: false },
        { input: 'fasdfa', result: false }
    ];
    let validator = new ICOValidator();


    for (let op in params) {
        (function (item) {
            it('should check ico number ' + item.input + ' -> ' + item.result, function () {
                expect(item.result).to.equal(validator.isAcceptable(item.input));
            });
        })(params[op]);
    }
});
