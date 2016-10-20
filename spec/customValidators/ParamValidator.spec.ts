let expect = require('expect.js');
import paramValidator = require('../../src/customValidators/ParamValidator');
let Q = require('q');

describe('ParamValidator', function () {

    let optionsFce = function (paramId:string) {
        let deferral = Q.defer();
        setTimeout(function () {
            let result: Array<any> = [];
            if (paramId === 'jobs') {
                result = [
                    { 'value': 1, 'text': 'manager' },
                    { 'value': 2, 'text': 'programmer' },
                    { 'value': 3, 'text': 'shop assistant' },
                    { 'value': 4, 'text': 'unemployed' },
                    { 'value': 5, 'text': 'machinery' },
                    { 'value': 6, 'text': 'agriculture' },
                    { 'value': 7, 'text': 'academic' },
                    { 'value': 8, 'text': 'goverment' }
                ];
            }
            if (paramId === 'countries') {
                result = [
                    { 'value': 'CZE', 'text': 'Czech Republic' },
                    { 'value': 'Germany', 'text': 'Germany' },
                    { 'value': 'France', 'text': 'France' },
                ];
            }


            deferral.resolve(result);
        }, 1000);
        return deferral.promise;
    };


    // when
    let validator = new paramValidator();
    validator.Options = optionsFce;
    validator.ParamId = 'jobs';

    // excercise
    let promiseResult = validator.isAcceptable('programmer');

    it('value from list should return true', function (done) {

        promiseResult.then(function(result) {

            // verify
            expect(result).to.equal(true);

            done();

        }).done(null, done);
    });

    // excercise
    let promiseResult2 = validator.isAcceptable('non existing item');

    it('value out of list should return false', function (done) {

        promiseResult2.then(function(result) {

            // verify
            expect(result).to.equal(false);

            done();

        }).done(null, done);
    });

});
