"use strict";
/**
 * Return true if it is a valid string date representation (can be parsed as date), otherwise false.
 */
var DateValidator = (function () {
    function DateValidator() {
        this.tagName = 'date';
    }
    DateValidator.prototype.isAcceptable = function (s) {
        return !/Invalid|NaN/.test(new Date(s).toString());
    };
    return DateValidator;
}());
exports.DateValidator = DateValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/date-validator.js.map