"use strict";
/**
 * Return true if it is a valid digit representation, otherwise false.
 */
var DigitValidator = (function () {
    function DigitValidator() {
        this.tagName = 'digit';
    }
    DigitValidator.prototype.isAcceptable = function (s) {
        return /^\d+$/.test(s);
    };
    return DigitValidator;
}());
exports.DigitValidator = DigitValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/digit-validator.js.map