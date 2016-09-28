"use strict";
var abstract_validation_rule_1 = require('./abstract-validation-rule');
var abstract_list_validation_rule_1 = require('./abstract-list-validation-rule');
/**
  *
  * @ngdoc object
  * @name  AbstractValidator
  * @module Validation
  *
  *
  * @description
  * It enables to create custom validator for your own abstract object (class) and to assign validation rules to its properties.
  * You can assigned these rules
  *
  * +  register property validation rules - use _RuleFor_ property
  * +  register property async validation rules - use _RuleFor_ property
  * +  register shared validation rules - use _Validation_ or _ValidationFor_ property
  * +  register custom object validator - use _ValidatorFor_ property - enables composition of child custom validators
  */
var AbstractValidator = (function () {
    function AbstractValidator() {
        this.Validators = {};
        this.AbstractValidators = {};
        this.ValidationFunctions = {};
        /**
        * Return true if this validation rule is intended for list of items, otherwise true.
        */
        this.ForList = false;
    }
    /**
     *  Register property validator for property.
     * @param prop - property name
     * @param validator - property validator
     */
    AbstractValidator.prototype.RuleFor = function (prop, validator) {
        if (this.Validators[prop] === undefined) {
            this.Validators[prop] = [];
        }
        this.Validators[prop].push(validator);
    };
    /**
     *  Register shared validation and assign property name as dependency on shared rule.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param prop name
     * @param fce name validation function
     */
    AbstractValidator.prototype.ValidationFor = function (prop, fce) {
        if (this.ValidationFunctions[prop] === undefined) {
            this.ValidationFunctions[prop] = [];
        }
        this.ValidationFunctions[prop].push(fce);
    };
    /**
     *  Register shared validation. There are no relationship to dependent property.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param fce name validation function
     */
    AbstractValidator.prototype.Validation = function (fce) {
        if (fce.Name === undefined)
            throw 'argument must have property Name';
        this.ValidationFor(fce.Name, fce);
    };
    /**
     * Register child validator for property - composition of validators
     * @param prop name
     * @param validator child validator
     * @param forList true if is array structure, otherwise false
     */
    AbstractValidator.prototype.ValidatorFor = function (prop, validator, forList) {
        validator.ForList = forList;
        this.AbstractValidators[prop] = validator;
    };
    AbstractValidator.prototype.CreateAbstractRule = function (name) {
        return new abstract_validation_rule_1.AbstractValidationRule(name, this);
    };
    AbstractValidator.prototype.CreateAbstractListRule = function (name) {
        return new abstract_list_validation_rule_1.AbstractListValidationRule(name, this);
    };
    AbstractValidator.prototype.CreateRule = function (name) {
        return new abstract_validation_rule_1.AbstractValidationRule(name, this);
    };
    return AbstractValidator;
}());
exports.AbstractValidator = AbstractValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/abstract-validator.js.map