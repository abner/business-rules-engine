"use strict";
var min_length_validator_1 = require('./min-length-validator');
var max_length_validator_1 = require('./max-length-validator');
var _ = require('underscore');
/**
 * Return true if value is between Min and Max property.
 *
 *  @require underscore
 */
var RangeValidator = (function () {
    /**
     * Default constructor.
     * @param Range - array [the value of 'minimum', the value of 'maximum']
     */
    function RangeValidator(Range) {
        this.Range = Range;
        this.tagName = 'range';
        if (Range === undefined) {
            this.Range = [min_length_validator_1.MinimalDefaultValue, max_length_validator_1.MaximalDefaultValue];
        }
        ;
    }
    RangeValidator.prototype.isAcceptable = function (s) {
        if (!_.isNumber(s)) {
            s = parseFloat(s);
        }
        return s >= this.Min && s <= this.Max;
    };
    Object.defineProperty(RangeValidator.prototype, "Min", {
        /**
         * Return the value of 'minimum'
         * @returns {number}
         */
        get: function () {
            return this.Range[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeValidator.prototype, "Max", {
        /**
         * Return the value of 'maximum'
         * @returns {number}
         */
        get: function () {
            return this.Range[1];
        },
        enumerable: true,
        configurable: true
    });
    return RangeValidator;
}());
exports.RangeValidator = RangeValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/range-validator.js.map