"use strict";
exports.MinimalDefaultValue = 0;
/**
 * Return true if string length is greater or equal to MinLength property.
 */
var MinLengthValidator = (function () {
    /**
     * Default constructor
     * @param MinLength - minimal number of characters.
     */
    function MinLengthValidator(MinLength) {
        this.MinLength = MinLength;
        this.tagName = 'minlength';
        if (MinLength === undefined) {
            this.MinLength = exports.MinimalDefaultValue;
        }
    }
    MinLengthValidator.prototype.isAcceptable = function (s) {
        return s.length >= this.MinLength;
    };
    return MinLengthValidator;
}());
exports.MinLengthValidator = MinLengthValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/min-length-validator.js.map