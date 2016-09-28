"use strict";
/**
 * Return true if an value is valid against specified pattern, otherwise false.
 */
var PatternValidator = (function () {
    /**
     * Default constructor.
     * @param Pattern - pattern
     */
    function PatternValidator(Pattern) {
        this.Pattern = Pattern;
        this.tagName = 'pattern';
    }
    PatternValidator.prototype.isAcceptable = function (s) {
        return new RegExp(this.Pattern).test(s);
    };
    return PatternValidator;
}());
exports.PatternValidator = PatternValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/pattern-validator.js.map