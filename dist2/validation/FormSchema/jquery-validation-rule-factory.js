"use strict";
var Validation = require('../Validation');
var Validators = require('../Validators');
var _ = require('underscore');
/**
 * It represents the JSON schema factory for creating validation rules based on raw JSON data annotated by validation rules.
 * It uses constraints keywords from JQuery validation plugin.
 */
var JQueryValidationRuleFactory = (function () {
    /**
     * Default constructor
     * @param metaData -  raw JSON data annotated by validation rules
     */
    function JQueryValidationRuleFactory(metaData) {
        this.metaData = metaData;
    }
    /**
     * Return abstract validation rule by traversing raw JSON data annotated by validation rules.
     * @returns {IAbstractValidator<any>} return validation rule
     */
    JQueryValidationRuleFactory.prototype.CreateAbstractValidator = function () {
        return this.ParseAbstractRule(this.metaData);
    };
    /**
     * Return an concrete validation rule by traversing raw JSON data annotated by validation rules.
     * @param name validation rule name
     * @returns {IValidationRule<any>} return validation rule
     */
    JQueryValidationRuleFactory.prototype.CreateRule = function (name) {
        return this.ParseAbstractRule(this.metaData).CreateRule(name);
    };
    /**
     * Returns an concrete validation rule structured according to JSON schema.
     */
    JQueryValidationRuleFactory.prototype.ParseAbstractRule = function (metaData) {
        var rule = new Validation.AbstractValidator();
        var _loop_1 = function(key) {
            var item = metaData[key];
            var rules = item[JQueryValidationRuleFactory.RULES_KEY];
            if (_.isArray(item)) {
                if (item[1] !== undefined) {
                    _.each(this_1.ParseValidationAttribute(item[1]), function (validator) {
                        rule.RuleFor(key, validator);
                    });
                }
                rule.ValidatorFor(key, this_1.ParseAbstractRule(item[0]), true);
            }
            else if (rules !== undefined) {
                _.each(this_1.ParseValidationAttribute(rules), function (validator) { rule.RuleFor(key, validator); });
            }
            else if (_.isObject(item)) {
                rule.ValidatorFor(key, this_1.ParseAbstractRule(item));
            }
            else {
                // ignore
                return "continue";
            }
        };
        var this_1 = this;
        for (var key in metaData) {
            _loop_1(key);
        }
        return rule;
    };
    /**
     * Return list of property validators that corresponds json items for JQuery validation pluging tags.
     * See specification - http://jqueryvalidation.org/documentation/
     */
    JQueryValidationRuleFactory.prototype.ParseValidationAttribute = function (item) {
        var validators = new Array();
        if (item === undefined)
            return validators;
        var validation = item['required'];
        if (validation !== undefined && validation) {
            validators.push(new Validators.RequiredValidator());
        }
        validation = item['remote'];
        if (validation !== undefined && validation) {
            validators.push(new Validators.RemoteValidator(validation));
        }
        // maxLength validation
        validation = item['maxlength'];
        if (validation !== undefined) {
            validators.push(new Validators.MaxLengthValidator(validation));
        }
        // minLength validation
        validation = item['minlength'];
        if (validation !== undefined) {
            validators.push(new Validators.MinLengthValidator(validation));
        }
        // rangelength validation
        validation = item['rangelength'];
        if (validation !== undefined) {
            validators.push(new Validators.RangeLengthValidator(validation));
        }
        // maximum validation
        validation = item['max'];
        if (validation !== undefined) {
            validators.push(new Validators.MaxValidator(validation));
        }
        // minimum validation
        validation = item['min'];
        if (validation !== undefined) {
            validators.push(new Validators.MinValidator(validation));
        }
        // range validation
        validation = item['range'];
        if (validation !== undefined) {
            validators.push(new Validators.RangeValidator(validation));
        }
        validation = item['email'];
        if (validation !== undefined) {
            validators.push(new Validators.EmailValidator());
        }
        validation = item['url'];
        if (validation !== undefined) {
            validators.push(new Validators.UrlValidator());
        }
        validation = item['date'];
        if (validation !== undefined) {
            validators.push(new Validators.DateValidator());
        }
        validation = item['dateISO'];
        if (validation !== undefined) {
            validators.push(new Validators.DateISOValidator());
        }
        validation = item['number'];
        if (validation !== undefined) {
            validators.push(new Validators.NumberValidator());
        }
        validation = item['digits'];
        if (validation !== undefined) {
            validators.push(new Validators.DigitValidator());
        }
        validation = item['creditcard'];
        if (validation !== undefined) {
            validators.push(new Validators.CreditCardValidator());
        }
        validation = item['equalTo'];
        if (validation !== undefined) {
            validators.push(new Validators.EqualToValidator(validation));
        }
        // min items validation
        validation = item['minItems'];
        if (validation !== undefined) {
            validators.push(new Validators.MinItemsValidator(validation));
        }
        // max items validation
        validation = item['maxItems'];
        if (validation !== undefined) {
            validators.push(new Validators.MaxItemsValidator(validation));
        }
        // uniqueItems validation
        validation = item['uniqueItems'];
        if (validation !== undefined) {
            validators.push(new Validators.UniqItemsValidator());
        }
        // enum validation
        validation = item['enum'];
        if (validation !== undefined) {
            validators.push(new Validators.EnumValidator(validation));
        }
        //           // pattern validation
        //           validation = item['pattern'];
        //           if (validation !== undefined) {
        //               validators.push(new Validators.PatternValidator(validation))
        //           }
        return validators;
    };
    JQueryValidationRuleFactory.RULES_KEY = 'rules';
    JQueryValidationRuleFactory.DEFAULT_KEY = 'default';
    return JQueryValidationRuleFactory;
}());
exports.JQueryValidationRuleFactory = JQueryValidationRuleFactory;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/FormSchema/jquery-validation-rule-factory.js.map