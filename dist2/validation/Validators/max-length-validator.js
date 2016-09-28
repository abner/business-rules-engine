"use strict";
exports.MaximalDefaultValue = 0;
/**
 * Return true if string length is less or equal to MaxLength property.
 */
var MaxLengthValidator = (function () {
    /**
     * Default constructor.
     * @param MaxLength - maximal number of characters.
     */
    function MaxLengthValidator(MaxLength) {
        this.MaxLength = MaxLength;
        this.tagName = 'maxlength';
        if (MaxLength === undefined) {
            this.MaxLength = exports.MaximalDefaultValue;
        }
    }
    MaxLengthValidator.prototype.isAcceptable = function (s) {
        return s.length <= this.MaxLength;
    };
    return MaxLengthValidator;
}());
exports.MaxLengthValidator = MaxLengthValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/max-length-validator.js.map