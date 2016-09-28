"use strict";
var mixed_validation_result_1 = require('./mixed-validation-result');
var _ = require('underscore');
/**
 *  It represents visitor class that enables to separate validation result creation from validation execution.
 *  You can create your own Visitors for composing ValidationResults on your own.
 */
var ValidationResultVisitor = (function () {
    function ValidationResultVisitor(ValidationResult) {
        this.ValidationResult = ValidationResult;
    }
    ValidationResultVisitor.prototype.AddRule = function (rule) {
        // if (this.ValidationResult.ErrorsChanged !== undefined) rule.ErrorsChanged = this.ValidationResult.ErrorsChanged;
        this.ValidationResult.Add(rule);
    };
    ValidationResultVisitor.prototype.AddValidator = function (rule) {
        // mixed composite validation result with property validation error
        // TODO: find better and more generic way how to solve mixed validation results with the same name
        var error = _.find(this.ValidationResult.Children, function (item) { return item.Name === rule.ValidationResult.Name; });
        if (error !== undefined) {
            // compose composite validation result with property validation result
            this.ValidationResult.Add(new mixed_validation_result_1.MixedValidationResult(rule.ValidationResult, error));
        }
        else {
            this.ValidationResult.Add(rule.ValidationResult);
        }
    };
    ValidationResultVisitor.prototype.AddValidation = function (validator) {
        this.ValidationResult.Add(validator);
    };
    return ValidationResultVisitor;
}());
exports.ValidationResultVisitor = ValidationResultVisitor;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/validation-result-visitor.js.map