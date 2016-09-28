"use strict";
var number_fce_1 = require('./../Utils/number-fce');
/**
     * Return true if an value is multiplier of passed number step, otherwise false.
     */
var StepValidator = (function () {
    /**
     * Default constructor.
     * @param Step - step multiplier
     */
    function StepValidator(Step) {
        this.Step = Step;
        this.tagName = 'step';
        this.StepDefaultValue = '1';
        if (Step === undefined) {
            this.Step = this.StepDefaultValue;
        }
    }
    StepValidator.prototype.isAcceptable = function (s) {
        var maxNegDigits = Math.max(number_fce_1.NumberFce.GetNegDigits(s), number_fce_1.NumberFce.GetNegDigits(this.Step));
        var multiplier = Math.pow(10, maxNegDigits);
        return (parseInt(s, 10) * multiplier) % (parseInt(this.Step, 10) * multiplier) === 0;
    };
    return StepValidator;
}());
exports.StepValidator = StepValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/step-validator.js.map