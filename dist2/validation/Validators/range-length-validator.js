"use strict";
var min_length_validator_1 = require('./min-length-validator');
var max_length_validator_1 = require('./max-length-validator');
/**
    * Return true if string length is between MinLength and MaxLength property.
    */
var RangeLengthValidator = (function () {
    /**
     * Default constructor.
     * @param RangeLength - array [minimal number of characters, maximal number of characters]
     */
    function RangeLengthValidator(RangeLength) {
        this.RangeLength = RangeLength;
        this.tagName = 'rangelength';
        if (RangeLength === undefined) {
            this.RangeLength = [min_length_validator_1.MinimalDefaultValue, max_length_validator_1.MaximalDefaultValue];
        }
    }
    RangeLengthValidator.prototype.isAcceptable = function (s) {
        return s.length >= this.MinLength && s.length <= this.MaxLength;
    };
    Object.defineProperty(RangeLengthValidator.prototype, "MinLength", {
        get: function () {
            return this.RangeLength[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeLengthValidator.prototype, "MaxLength", {
        get: function () {
            return this.RangeLength[1];
        },
        enumerable: true,
        configurable: true
    });
    return RangeLengthValidator;
}());
exports.RangeLengthValidator = RangeLengthValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/range-length-validator.js.map