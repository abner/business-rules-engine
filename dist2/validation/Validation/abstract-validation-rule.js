"use strict";
var _ = require('underscore');
var Q = require('q');
var results_1 = require('./results');
var validator_1 = require('./validator');
var validation_result_visitor_1 = require('./validation-result-visitor');
var property_validation_rule_1 = require('./property-validation-rule');
var validation_context_1 = require('./validation-context');
/**
     *
     * @ngdoc object
     * @name  AbstractValidationRule
     * @module Validation
     *
     *
     * @description
     * It represents concreate validator for custom object. It enables to assign validation rules to custom object properties.
     */
var AbstractValidationRule = (function () {
    function AbstractValidationRule(Name, validator, ForList) {
        this.Name = Name;
        this.validator = validator;
        this.ForList = ForList;
        this.Rules = {};
        this.Validators = {};
        this.Children = {};
        this.ValidationResultVisitor = new validation_result_visitor_1.ValidationResultVisitor(new results_1.CompositeValidationResult(this.Name));
        if (!this.ForList) {
            _.each(this.validator.Validators, function (val, key) {
                this.createRuleFor(key);
                _.each(val, function (validator) {
                    this.Rules[key].AddValidator(validator);
                }, this);
            }, this);
            _.each(this.validator.ValidationFunctions, function (val) {
                _.each(val, function (validation) {
                    var validator = this.Validators[validation.Name];
                    if (validator === undefined) {
                        validator = new validator_1.Validator(validation.Name, validation.ValidationFce, validation.AsyncValidationFce);
                        this.Validators[validation.Name] = validator;
                        validator.AcceptVisitor(this.ValidationResultVisitor);
                    }
                }, this);
            }, this);
            this.addChildren();
        }
    }
    Object.defineProperty(AbstractValidationRule.prototype, "ValidationResult", {
        get: function () { return this.ValidationResultVisitor.ValidationResult; },
        set: function (value) { this.ValidationResultVisitor.ValidationResult = value; },
        enumerable: true,
        configurable: true
    });
    AbstractValidationRule.prototype.AcceptVisitor = function (visitor) {
        visitor.AddValidator(this);
    };
    AbstractValidationRule.prototype.addChildren = function () {
        _.each(this.validator.AbstractValidators, function (val, key) {
            var validationRule;
            if (val.ForList) {
                validationRule = val.CreateAbstractListRule(key);
            }
            else {
                validationRule = val.CreateAbstractRule(key);
            }
            this.Children[key] = validationRule;
            validationRule.AcceptVisitor(this.ValidationResultVisitor);
            // this.ValidationResult.Add(validationRule.ValidationResult);
        }, this);
    };
    AbstractValidationRule.prototype.SetOptional = function (fce) {
        this.ValidationResult.Optional = fce;
        _.each(this.Rules, function (value, key) { value.Optional = fce; });
        _.each(this.Validators, function (value, key) { value.Optional = fce; });
        _.each(this.Children, function (value, key) { value.SetOptional(fce); });
    };
    AbstractValidationRule.prototype.createRuleFor = function (prop) {
        var propValidationRule = new property_validation_rule_1.PropertyValidationRule(prop);
        this.Rules[prop] = propValidationRule;
        propValidationRule.AcceptVisitor(this.ValidationResultVisitor);
        // this.ValidationResult.Add(propValidationRule);
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    AbstractValidationRule.prototype.Validate = function (context) {
        _.each(this.Children, function (val, key) {
            if (context[key] === undefined)
                context[key] = val.ForList ? [] : {};
            val.Validate(context[key]);
        }, this);
        for (var propName in this.Rules) {
            var rule = this.Rules[propName];
            rule.Validate(new validation_context_1.ValidationContext(propName, context));
        }
        _.each(this.validator.ValidationFunctions, function (valFunctions) {
            _.each(valFunctions, function (valFce) {
                var validator = this.Validators[valFce.Name];
                if (validator !== undefined)
                    validator.Validate(context);
            }, this);
        }, this);
        return this.ValidationResult;
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    AbstractValidationRule.prototype.ValidateAsync = function (context) {
        var deferred = Q.defer();
        var promises = [];
        _.each(this.Children, function (val, key) {
            promises.push(val.ValidateAsync(context[key]));
        }, this);
        for (var propName in this.Rules) {
            var rule = this.Rules[propName];
            promises.push(rule.ValidateAsync(new validation_context_1.ValidationContext(propName, context)));
        }
        _.each(this.validator.ValidationFunctions, function (valFunctions) {
            _.each(valFunctions, function (valFce) {
                var validator = this.Validators[valFce.Name];
                if (validator !== undefined)
                    promises.push(validator.ValidateAsync(context));
            }, this);
        }, this);
        var self = this;
        Q.all(promises).then(function (result) { deferred.resolve(self.ValidationResult); });
        return deferred.promise;
    };
    AbstractValidationRule.prototype.ValidateAll = function (context) {
        this.Validate(context);
        return this.ValidateAsync(context);
    };
    AbstractValidationRule.prototype.ValidateProperty = function (context, propName) {
        var childRule = this.Children[propName];
        if (childRule !== undefined)
            childRule.Validate(context[propName]);
        var rule = this.Rules[propName];
        if (rule !== undefined) {
            var valContext = new validation_context_1.ValidationContext(propName, context);
            rule.Validate(valContext);
            rule.ValidateAsync(valContext);
        }
        var validationFces = this.validator.ValidationFunctions[propName];
        if (validationFces !== undefined) {
            _.each(validationFces, function (valFce) {
                var validator = this.Validators[valFce.Name];
                if (validator !== undefined)
                    validator.Validate(context);
            }, this);
        }
    };
    AbstractValidationRule.prototype.add = function (child) {
        throw 'not implemented';
        // return false;
    };
    AbstractValidationRule.prototype.remove = function (child) {
        throw 'not implemented';
        // return false;
    };
    AbstractValidationRule.prototype.getChildren = function () {
        return _.map(this.Children, function (item) {
            return item;
        });
    };
    AbstractValidationRule.prototype.getName = function () {
        return this.Name;
    };
    AbstractValidationRule.prototype.isItem = function () {
        return this.getChildren().length === 0;
    };
    AbstractValidationRule.id = 0;
    return AbstractValidationRule;
}());
exports.AbstractValidationRule = AbstractValidationRule;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/abstract-validation-rule.js.map