"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('underscore');
var Q = require('q');
var errors_1 = require('./errors');
var results_1 = require('./results');
var message_localization_1 = require('./message-localization');
/**
 *
 * @ngdoc object
 * @name  PropertyValidationRule
 * @module Validation
 *
 *
 * @description
 * It represents a property validation rule. The property has assigned collection of property validators.
 */
var PropertyValidationRule = (function (_super) {
    __extends(PropertyValidationRule, _super);
    function PropertyValidationRule(Name, validatorsToAdd) {
        _super.call(this, Name);
        this.Name = Name;
        this.Validators = {};
        this.ValidationFailures = {};
        for (var index in validatorsToAdd) {
            if (index) {
                this.AddValidator(validatorsToAdd[index]);
            }
        }
    }
    // public AsyncValidationFailures:{[name:string]: IAsyncValidationFailure} = {};
    PropertyValidationRule.prototype.AcceptVisitor = function (visitor) {
        visitor.AddRule(this);
    };
    PropertyValidationRule.prototype.AddValidator = function (validator) {
        this.Validators[validator.tagName] = validator;
        this.ValidationFailures[validator.tagName] = new errors_1.ValidationFailure(new errors_1.Error(), !!validator.isAsync);
    };
    Object.defineProperty(PropertyValidationRule.prototype, "Errors", {
        get: function () {
            return this.ValidationFailures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "HasErrors", {
        get: function () {
            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional()) {
                return false;
            }
            return _.some(_.values(this.Errors), function (error) {
                return error.HasError;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "ErrorCount", {
        get: function () {
            return this.HasErrors ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "ErrorMessage", {
        get: function () {
            if (!this.HasErrors) {
                return '';
            }
            return _.reduce(_.values(this.Errors), function (memo, error) {
                return memo + error.ErrorMessage;
            }, '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidationRule.prototype, "TranslateArgs", {
        get: function () {
            if (!this.HasErrors) {
                return [];
            }
            var newArray = [];
            _.each(_.values(this.Errors), function (error) {
                if (error.HasError) {
                    newArray.push(error.Error.TranslateArgs);
                }
            });
            return newArray;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    PropertyValidationRule.prototype.Validate = function (context) {
        try {
            return this.ValidateEx(context.Value);
        }
        catch (e) {
            // if (this.settings.debug && window.console) {
            console.log('Exception occurred when checking element ' + context.Key + '.', e);
            // }
            throw e;
        }
    };
    PropertyValidationRule.prototype.ValidateEx = function (value) {
        var lastPriority = 0;
        var shortCircuited = false;
        var original = this.HasErrors;
        for (var index in this.ValidationFailures) {
            if (index) {
                var validation = this.ValidationFailures[index];
                if (validation.IsAsync) {
                    continue;
                }
                var validator = this.Validators[index];
                try {
                    var priority = 0;
                    if (shortCircuited && priority > lastPriority) {
                        validation.Error.HasError = false;
                    }
                    else {
                        var hasError = ((value === undefined || value === null) && validator.tagName !== 'required')
                            ? false
                            : !validator.isAcceptable(value);
                        validation.Error.HasError = hasError;
                        validation.Error.TranslateArgs = {
                            TranslateId: validator.tagName,
                            MessageArgs: _.extend(validator, { AttemptedValue: value }), CustomMessage: validator.customMessage
                        };
                        validation.Error.ErrorMessage = hasError ?
                            message_localization_1.MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : '';
                        shortCircuited = hasError;
                        lastPriority = priority;
                    }
                }
                catch (e) {
                    // if (this.settings.debug && window.console) {
                    console.log('Exception occurred when checking element\'' + validator.tagName + '\' method.', e);
                    // }
                    throw e;
                }
            }
        }
        if (original !== this.HasErrors) {
            this.DispatchErrorsChanged();
        }
        return _.filter(this.ValidationFailures, function (item) { return !item.IsAsync; });
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    PropertyValidationRule.prototype.ValidateAsync = function (context) {
        return this.ValidateAsyncEx(context.Value);
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    PropertyValidationRule.prototype.ValidateAsyncEx = function (value) {
        var deferred = Q.defer();
        var promises = [];
        var original = this.HasErrors;
        var setResultFce = function (result, validator, validation) {
            var hasError = !result;
            validation.Error.HasError = hasError;
            validation.Error.TranslateArgs = { TranslateId: validator.tagName, MessageArgs: _.extend(validator, { AttemptedValue: value }) };
            validation.Error.ErrorMessage = hasError ? message_localization_1.MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : '';
        };
        var _loop_1 = function(index) {
            if (index) {
                var validation_1 = this_1.ValidationFailures[index];
                if (!validation_1.IsAsync) {
                    return "continue";
                }
                ;
                var validator_1 = this_1.Validators[index];
                try {
                    var hasErrorPromise = ((value === undefined || value === null) && validator_1.tagName !== 'required') ?
                        Q.when(true) : validator_1.isAcceptable(value);
                    hasErrorPromise.then(function (result) { return setResultFce(result, validator_1, validation_1); });
                    promises.push(hasErrorPromise);
                }
                catch (e) {
                    // if (this.settings.debug && window.console) {
                    console.log('Exception occurred when checking element\'' + validator_1.tagName + '\' method.', e);
                    // }
                    throw e;
                }
            }
        };
        var this_1 = this;
        for (var index in this.ValidationFailures) {
            _loop_1(index);
        }
        var self = this;
        Q.all(promises).then(function (result) {
            if (original !== self.HasErrors) {
                self.DispatchErrorsChanged();
            }
            ;
            deferred.resolve(_.filter(self.ValidationFailures, function (item) { return item.IsAsync; }));
        });
        return deferred.promise;
    };
    return PropertyValidationRule;
}(results_1.ValidationResult));
exports.PropertyValidationRule = PropertyValidationRule;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/property-validation-rule.js.map