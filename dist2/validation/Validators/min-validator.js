"use strict";
var _ = require('underscore');
var min_length_validator_1 = require('./min-length-validator');
/**
 * Return true only for these conditions
 * if 'Exclusive' is false, then the instance is valid if it is greater than, or equal to, the value of 'minimum';
 * if 'Exclusive' is true, the instance is valid if it is strictly greater than the value of 'minimum'.
 *
 *  @require underscore
 */
var MinValidator = (function () {
    /**
     * Default constructor.
     * @param Min - the value of 'minimum'
     * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of 'minimum';
     */
    function MinValidator(Min, Exclusive) {
        this.Min = Min;
        this.Exclusive = Exclusive;
        this.tagName = 'min';
        if (Min === undefined) {
            this.Min = min_length_validator_1.MinimalDefaultValue;
        }
    }
    MinValidator.prototype.isAcceptable = function (s) {
        if (!_.isNumber(s)) {
            s = parseFloat(s);
        }
        return this.Exclusive ? (s > this.Min) : (s >= this.Min);
    };
    return MinValidator;
}());
exports.MinValidator = MinValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/min-validator.js.map