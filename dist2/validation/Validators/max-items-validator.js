"use strict";
var max_length_validator_1 = require('./max-length-validator');
var _ = require('underscore');
/**
 * Return true if an number of items in array is greater or equal to the value of 'maximum'.
 *
 *  @require underscore
 */
var MaxItemsValidator = (function () {
    /**
     * Default constructor.
     * @param Max - the value of 'maximum'
     */
    function MaxItemsValidator(Max) {
        this.Max = Max;
        this.tagName = 'maxItems';
        if (Max === undefined) {
            this.Max = max_length_validator_1.MaximalDefaultValue;
        }
    }
    MaxItemsValidator.prototype.isAcceptable = function (s) {
        if (_.isArray(s)) {
            return s.length <= this.Max;
        }
        return false;
    };
    return MaxItemsValidator;
}());
exports.MaxItemsValidator = MaxItemsValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/max-items-validator.js.map