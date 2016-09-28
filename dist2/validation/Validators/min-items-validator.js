"use strict";
var min_length_validator_1 = require('./min-length-validator');
var _ = require('underscore');
/**
    * Return true if the number of items in array is lower or equal to the value of "minimum".
    *
    *  @require underscore
    */
var MinItemsValidator = (function () {
    /**
     * Default constructor.
     * @param Max - the value of "minimum"
     */
    function MinItemsValidator(Min) {
        this.Min = Min;
        this.tagName = 'minItems';
        if (Min === undefined) {
            this.Min = min_length_validator_1.MinimalDefaultValue;
        }
    }
    MinItemsValidator.prototype.isAcceptable = function (s) {
        if (_.isArray(s)) {
            return s.length >= this.Min;
        }
        return false;
    };
    return MinItemsValidator;
}());
exports.MinItemsValidator = MinItemsValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/min-items-validator.js.map