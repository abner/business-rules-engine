"use strict";
/**
 * Return true if it is not empty value, otherwise false.
 */
var RequiredValidator = (function () {
    function RequiredValidator() {
        this.tagName = 'required';
    }
    RequiredValidator.prototype.isAcceptable = function (s) {
        return s !== undefined && s !== '' && s !== null;
    };
    return RequiredValidator;
}());
exports.RequiredValidator = RequiredValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/required-validator.js.map