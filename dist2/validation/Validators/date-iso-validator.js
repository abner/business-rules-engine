"use strict";
/**
 * Return true if it is a valid string ISO date representation (can be parsed as ISO date), otherwise false.
 */
var DateISOValidator = (function () {
    function DateISOValidator() {
        this.tagName = 'dateISO';
    }
    DateISOValidator.prototype.isAcceptable = function (s) {
        return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(s);
    };
    return DateISOValidator;
}());
exports.DateISOValidator = DateISOValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/date-iso-validator.js.map