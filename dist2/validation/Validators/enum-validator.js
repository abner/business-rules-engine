"use strict";
var _ = require('underscore');
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 *
 *  @require underscore
 */
var EnumValidator = (function () {
    /**
     * Default constructor.
     * @param Enum - array of values
     */
    function EnumValidator(Enum) {
        this.Enum = Enum;
        this.tagName = 'enum';
        if (Enum === undefined) {
            this.Enum = [];
        }
    }
    EnumValidator.prototype.isAcceptable = function (s) {
        return _.contains(this.Enum, s);
    };
    return EnumValidator;
}());
exports.EnumValidator = EnumValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/enum-validator.js.map