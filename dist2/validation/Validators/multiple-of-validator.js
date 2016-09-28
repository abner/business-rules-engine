"use strict";
var _ = require('underscore');
/**
 * Return true if a numeric instance is valid against 'multipleOf' if the result of the division of the instance by this keyword's value is an integer, otherwise false.
 *
 *  @require underscore
 */
var MultipleOfValidator = (function () {
    /**
     * Default constructor
     * @param Divider
     */
    function MultipleOfValidator(Divider) {
        this.Divider = Divider;
        this.tagName = 'multipleOf';
        this.MultipleOfDefaultValue = 1;
        if (Divider === undefined)
            this.Divider = this.MultipleOfDefaultValue;
    }
    MultipleOfValidator.prototype.isAcceptable = function (s) {
        if (!_.isNumber(s))
            return false;
        return (s % this.Divider) % 1 === 0;
    };
    return MultipleOfValidator;
}());
exports.MultipleOfValidator = MultipleOfValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/multiple-of-validator.js.map