"use strict";
var _ = require('underscore');
var Validation = require('../Validation');
var Validators = require('../Validators');
var util_1 = require('./util');
/**
 * It represents the JSON schema factory for creating validation rules based on JSON form schema.
 * It uses constraints keywords from JSON Schema Validation specification.
 */
var JsonSchemaRuleFactory = (function () {
    /**
     * Default constructor
     * @param jsonSchema JSON schema for business rules.
     */
    function JsonSchemaRuleFactory(jsonSchema) {
        this.jsonSchema = jsonSchema;
    }
    /**
     * Return abstract validation rule by traversing  JSON schema.
     * @returns {IAbstractValidator<any>} return validation rule
     */
    JsonSchemaRuleFactory.prototype.CreateAbstractValidator = function () {
        return this.ParseAbstractRule(this.jsonSchema);
    };
    /**
     * Return concrete validation rule structured according to JSON schema.
     * @param name validation rule name
     * @returns {IAbstractValidationRule<any>} return validation rule
     */
    JsonSchemaRuleFactory.prototype.CreateRule = function (name) {
        return this.ParseAbstractRule(this.jsonSchema).CreateRule(name);
    };
    /**
     * Returns an concrete validation rules structured according to JSON schema.
     */
    JsonSchemaRuleFactory.prototype.ParseAbstractRule = function (formSchema) {
        var rule = new Validation.AbstractValidator();
        var _loop_1 = function(key) {
            var item = formSchema[key];
            var type = item[util_1.Util.TYPE_KEY];
            if (type === 'object') {
                rule.ValidatorFor(key, this_1.ParseAbstractRule(item[util_1.Util.PROPERTIES_KEY]));
            }
            else if (type === 'array') {
                _.each(this_1.ParseValidationAttribute(item), function (validator) { rule.RuleFor(key, validator); });
                rule.ValidatorFor(key, this_1.ParseAbstractRule(item[util_1.Util.ARRAY_KEY][util_1.Util.PROPERTIES_KEY]), true);
            }
            else {
                _.each(this_1.ParseValidationAttribute(item), function (validator) { rule.RuleFor(key, validator); });
            }
        };
        var this_1 = this;
        for (var key in formSchema) {
            _loop_1(key);
        }
        return rule;
    };
    /**
     * Return list of property validators that corresponds json items for JSON form validation tags.
     * See keywords specifications -> http://json-schema.org/latest/json-schema-validation.html
     */
    JsonSchemaRuleFactory.prototype.ParseValidationAttribute = function (item) {
        var validators = new Array();
        var validation;
        if (item === undefined)
            return validators;
        // 5.  Validation keywords sorted by instance types
        // http://json-schema.org/latest/json-schema-validation.html
        // 5.1. - Validation keywords for numeric instances (number and integer)
        // multipleOf validation
        validation = item['multipleOf'];
        if (validation !== undefined) {
            validators.push(new Validators.MultipleOfValidator(validation));
        }
        // maximum validation
        validation = item['maximum'];
        if (validation !== undefined) {
            validators.push(new Validators.MaxValidator(validation, item['exclusiveMaximum']));
        }
        // minimum validation
        validation = item['minimum'];
        if (validation !== undefined) {
            validators.push(new Validators.MinValidator(validation, item['exclusiveMinimum']));
        }
        // 5.2. - Validation keywords for strings
        // maxLength validation
        validation = item['maxLength'];
        if (validation !== undefined) {
            validators.push(new Validators.MaxLengthValidator(validation));
        }
        // minLength validation
        validation = item['minLength'];
        if (validation !== undefined) {
            validators.push(new Validators.MinLengthValidator(validation));
        }
        // pattern validation
        validation = item['pattern'];
        if (validation !== undefined) {
            validators.push(new Validators.PatternValidator(validation));
        }
        // 5.3.  Validation keywords for arrays
        // TODO: additionalItems and items
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
        // 5.4.  Validation keywords for objects
        // TODO: maxProperties, minProperties, additionalProperties, properties and patternProperties, dependencies
        // required validation
        validation = item['required'];
        if (validation !== undefined && validation) {
            validators.push(new Validators.RequiredValidator());
        }
        // 5.5.  Validation keywords for any instance type
        //  enum validation
        validation = item['enum'];
        if (validation !== undefined) {
            validators.push(new Validators.EnumValidator(validation));
        }
        // type validation
        validation = item['type'];
        if (validation !== undefined) {
            validators.push(new Validators.TypeValidator(validation));
        }
        // 7.3.2 email
        validation = item['email'];
        if (validation !== undefined) {
            validators.push(new Validators.EmailValidator());
        }
        // 7.3.6 url
        validation = item['uri'];
        if (validation !== undefined) {
            validators.push(new Validators.UrlValidator());
        }
        // TODO: allOf,anyOf,oneOf,not,definitions
        return validators;
    };
    return JsonSchemaRuleFactory;
}());
exports.JsonSchemaRuleFactory = JsonSchemaRuleFactory;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/FormSchema/json-schema-rule-factory.js.map