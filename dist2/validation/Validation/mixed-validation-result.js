"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var results_1 = require('./results');
/**
 * It represents mixed validation rule for composite error object and property validation rule error.
 */
var MixedValidationResult = (function (_super) {
    __extends(MixedValidationResult, _super);
    function MixedValidationResult(Composite, PropRule) {
        _super.call(this, Composite.Name);
        this.Composite = Composite;
        this.PropRule = PropRule;
    }
    Object.defineProperty(MixedValidationResult.prototype, "Children", {
        get: function () { return this.Composite.Children; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "ValidationFailures", {
        get: function () { return this.PropRule.ValidationFailures; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "HasErrorsDirty", {
        get: function () {
            if (this.Composite.HasErrorsDirty)
                return true;
            if (this.PropRule !== undefined && this.PropRule.HasErrorsDirty)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "HasErrors", {
        get: function () {
            if (this.Composite.HasErrors)
                return true;
            if (this.PropRule !== undefined && this.PropRule.HasErrors)
                return true;
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "ErrorCount", {
        get: function () {
            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
                return 0;
            return this.Composite.ErrorCount + (this.PropRule !== undefined ? this.PropRule.ErrorCount : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixedValidationResult.prototype, "ErrorMessage", {
        get: function () {
            if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors)
                return "";
            this.Composite.ErrorMessage + this.PropRule !== undefined ? this.PropRule.ErrorMessage : "";
        },
        enumerable: true,
        configurable: true
    });
    return MixedValidationResult;
}(results_1.CompositeValidationResult));
exports.MixedValidationResult = MixedValidationResult;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/mixed-validation-result.js.map