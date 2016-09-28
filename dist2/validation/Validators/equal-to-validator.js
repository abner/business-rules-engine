"use strict";
/**
     * Return true if a value is equal (using strict equal) to passed value, otherwise false.
     */
var EqualToValidator = (function () {
    /**
     *
     * @param Value
     */
    function EqualToValidator(Value) {
        this.Value = Value;
        this.tagName = 'equalTo';
    }
    EqualToValidator.prototype.isAcceptable = function (s) {
        return s === this.Value;
    };
    return EqualToValidator;
}());
exports.EqualToValidator = EqualToValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/equal-to-validator.js.map