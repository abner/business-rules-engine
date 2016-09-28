"use strict";
/**
* Return true if it is a valid number representation, otherwise false.
*/
var NumberValidator = (function () {
    function NumberValidator() {
        this.tagName = 'number';
    }
    NumberValidator.prototype.isAcceptable = function (s) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(s);
    };
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/number-validator.js.map