"use strict";
var max_length_validator_1 = require('./max-length-validator');
var _ = require('underscore');
/**
     * Return true only for these conditions
     * if 'Exclusive' is false, then the instance is valid if it is lower than, or equal to, the value of 'maximum';
     * if 'Exclusive' is true, the instance is valid if it is strictly lower than the value of 'maximum'.
     *
     *  @require underscore
     */
var MaxValidator = (function () {
    /**
     * Default constructor
     * @param Max - the value of 'maximum'
     * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of 'maximum';
     */
    function MaxValidator(Max, Exclusive) {
        this.Max = Max;
        this.Exclusive = Exclusive;
        this.tagName = 'max';
        if (Max === undefined) {
            this.Max = max_length_validator_1.MaximalDefaultValue;
        }
    }
    MaxValidator.prototype.isAcceptable = function (s) {
        if (!_.isNumber(s)) {
            s = parseFloat(s);
        }
        return this.Exclusive ? (s < this.Max) : (s <= this.Max);
    };
    return MaxValidator;
}());
exports.MaxValidator = MaxValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/max-validator.js.map