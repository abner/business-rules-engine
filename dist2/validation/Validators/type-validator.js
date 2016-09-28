"use strict";
var _ = require('underscore');
/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
var TypeValidator = (function () {
    /**
     * Default constructor.
     * @param Type - keywords that defines an concrete type
     */
    function TypeValidator(Type) {
        this.Type = Type;
        this.tagName = 'type';
        if (this.Type === undefined) {
            this.Type = 'string';
        }
    }
    TypeValidator.prototype.isAcceptable = function (s) {
        switch (this.Type) {
            case 'string':
                return _.isString(s);
            case 'boolean':
                return _.isBoolean(s);
            case 'number':
                return _.isNumber(s);
            case 'integer':
                return /^\d+$/.test(s);
            case 'object':
                return _.isObject(s);
            case 'array':
                return _.isArray(s);
            default:
                return false;
        }
    };
    return TypeValidator;
}());
exports.TypeValidator = TypeValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/type-validator.js.map