"use strict";
/**
 *
 * @ngdoc object
 * @name  Error
 * @module Validation
 *
 *
 * @description
 * It represents basic error structure.
 */
var Error = (function () {
    function Error() {
        this.HasError = false;
        this.ErrorMessage = '';
    }
    return Error;
}());
exports.Error = Error;
/**
     *
     * @ngdoc object
     * @name  ValidationFailure
     * @module Validation
     *
     *
     * @description
     * It represents validation failure.
     */
var ValidationFailure = (function () {
    function ValidationFailure(Error, IsAsync) {
        this.Error = Error;
        this.IsAsync = IsAsync;
    }
    Object.defineProperty(ValidationFailure.prototype, "HasError", {
        get: function () { return this.Error.HasError; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFailure.prototype, "ErrorMessage", {
        get: function () { return this.Error.ErrorMessage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFailure.prototype, "TranslateArgs", {
        get: function () { return this.Error.TranslateArgs; },
        enumerable: true,
        configurable: true
    });
    return ValidationFailure;
}());
exports.ValidationFailure = ValidationFailure;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/errors.js.map