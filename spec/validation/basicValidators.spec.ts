let expect = require('expect.js');

import * as _ from 'lodash';
import { RangeValidator } from './../../src/validation/Validators/range-validator';
import { RemoteValidator } from './../../src/validation/Validators/remote-validator';

import Q = require('q');

describe('basic validators', function () {

    describe('Range validator', function () {
        let rangeValidator = new RemoteValidator();
        it('should return false when value is not in range', () => {
                let range = [5, 11];
                let rangeValidator = new RangeValidator(range);
                expect(rangeValidator.isAcceptable(4)).to.equal(false);
                expect(rangeValidator.isAcceptable(12)).to.equal(false);
            }
        );
        it('should return true when value is in range', () => {
                let range = [5, 11];
                let rangeValidator = new RangeValidator(range);
                expect(rangeValidator.isAcceptable(5)).to.equal(true);
                expect(rangeValidator.isAcceptable(7)).to.equal(true);
                expect(rangeValidator.isAcceptable(11)).to.equal(true);
            }
        );
    });

    describe('remote validator', function () {
        let remote = new RemoteValidator();
        remote.Options = {
            url: 'http://api.automeme.net/text.json'
        };


        it('non-existing country code should return false', function (done) {

            let promiseResult = remote.isAcceptable('abc@gmail.com');

            promiseResult.then(function (response) {
                expect(response).to.equal(false);

                done();
            }).done(null, done);
        });

//        it('existing country code return true', function (done) {
//
//            let promiseResult =remote.isAcceptable('abc@gmail.com')
//
//            promiseResult.then(function (response) {
//                expect(response).to.equal(true);
//
//                done();
//            }).done(null, done);
//        });
    });
});
