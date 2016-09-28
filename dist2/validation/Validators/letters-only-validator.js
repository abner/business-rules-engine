"use strict";
/**
 * Return true if it is a valid string letter representation, otherwise false.
 */
var LettersOnlyValidator = (function () {
    function LettersOnlyValidator() {
        this.lettersRegexp = /^[A-Za-z]+$/;
        this.tagName = 'lettersonly';
    }
    LettersOnlyValidator.prototype.isAcceptable = function (s) {
        return this.lettersRegexp.test(s);
    };
    return LettersOnlyValidator;
}());
exports.LettersOnlyValidator = LettersOnlyValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/letters-only-validator.js.map