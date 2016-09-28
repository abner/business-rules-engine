"use strict";
/**
*
* @ngdoc object
* @name  ValidationContext
* @module Validation
*
*
* @description
* It represents a data context for validation rule.
*/
var ValidationContext = (function () {
    function ValidationContext(Key, Data) {
        this.Key = Key;
        this.Data = Data;
    }
    Object.defineProperty(ValidationContext.prototype, "Value", {
        get: function () {
            return this.Data[this.Key];
        },
        enumerable: true,
        configurable: true
    });
    return ValidationContext;
}());
exports.ValidationContext = ValidationContext;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/validation-context.js.map