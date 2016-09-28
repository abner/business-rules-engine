"use strict";
/**
 * Return true if it is a valid positive or negative digit representation, otherwise false.
 */
var SignedDigitValidator = (function () {
    function SignedDigitValidator() {
        this.tagName = 'signedDigit';
    }
    SignedDigitValidator.prototype.isAcceptable = function (s) {
        return /^-?\d+$/.test(s);
    };
    return SignedDigitValidator;
}());
exports.SignedDigitValidator = SignedDigitValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/signed-digit-validator.js.map