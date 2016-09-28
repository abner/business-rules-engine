"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils = require('../Utils');
var _ = require('underscore');
/**
 *
 * @ngdoc object
 * @name  ValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents simple abstract error object.
 */
var ValidationResult = (function () {
    function ValidationResult(Name) {
        this.Name = Name;
        this.ErrorsChanged = new Utils.Signal();
    }
    Object.defineProperty(ValidationResult.prototype, "Children", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    ValidationResult.prototype.Add = function (error) {
        throw ('Cannot add to ValidationResult to leaf node.');
    };
    ValidationResult.prototype.Remove = function (index) {
        throw ('Cannot remove ValidationResult from leaf node.');
    };
    ValidationResult.prototype.DispatchErrorsChanged = function () {
        if (this.ErrorsChanged !== undefined)
            this.ErrorsChanged.dispatch(this);
    };
    Object.defineProperty(ValidationResult.prototype, "HasErrorsDirty", {
        get: function () {
            return this.IsDirty && this.HasErrors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "HasErrors", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "ErrorCount", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationResult.prototype, "ErrorMessage", {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    ValidationResult.prototype.add = function (child) { this.add(child); return true; };
    ValidationResult.prototype.remove = function (child) { this.remove(child); return true; };
    ValidationResult.prototype.getChildren = function () { return this.Children; };
    ValidationResult.prototype.getName = function () { return this.Name; };
    ValidationResult.prototype.isItem = function () { return true; };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
/**
 *
 * @ngdoc object
 * @name  CompositeValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents composite error object.
 */
var CompositeValidationResult = (function () {
    function CompositeValidationResult(Name) {
        this.Name = Name;
        this.Children = [];
        this.ErrorsChanged = new Utils.Signal();
    }
    CompositeValidationResult.prototype.AddFirst = function (error) {
        this.Children.unshift(error);
    };
    CompositeValidationResult.prototype.Add = function (error) {
        this.Children.push(error);
    };
    CompositeValidationResult.prototype.Remove = function (index) {
        this.Children.splice(index, 1);
    };
    CompositeValidationResult.prototype.Clear = function () {
        this.Children.splice(0, this.Children.length);
    };
    Object.defineProperty(CompositeValidationResult.prototype, "HasErrorsDirty", {
        get: function () {
            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional())
                return false;
            return _.some(this.Children, function (error) {
                return error.HasErrorsDirty;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "HasErrors", {
        get: function () {
            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional())
                return false;
            return _.some(this.Children, function (error) {
                return error.HasErrors;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "ErrorCount", {
        get: function () {
            if (!this.HasErrors)
                return 0;
            return _.reduce(this.Children, function (memo, error) {
                return memo + error.ErrorCount;
            }, 0);
            //return _.filter(this.children, function (error) { return error.HasErrors; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "ErrorMessage", {
        get: function () {
            if (!this.HasErrors)
                return "";
            return _.reduce(this.Children, function (memo, error) {
                return memo + error.ErrorMessage;
            }, "");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "TranslateArgs", {
        get: function () {
            if (!this.HasErrors)
                return [];
            var newArgs = [];
            _.each(this.Children, function (error) {
                newArgs = newArgs.concat(error.TranslateArgs);
            });
            return newArgs;
        },
        enumerable: true,
        configurable: true
    });
    CompositeValidationResult.prototype.LogErrors = function (headerMessage) {
        if (headerMessage === undefined)
            headerMessage = "Output";
        console.log("---------------\n");
        console.log("--- " + headerMessage + " ----\n");
        console.log("---------------\n");
        this.traverse(this, 1);
        console.log("\n\n\n");
    };
    Object.defineProperty(CompositeValidationResult.prototype, "Errors", {
        get: function () {
            var map = {};
            _.each(this.Children, function (val) {
                map[val.Name] = val;
            });
            return map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeValidationResult.prototype, "FlattenErros", {
        get: function () {
            var errors = [];
            this.flattenErrors(this, errors);
            return errors;
        },
        enumerable: true,
        configurable: true
    });
    CompositeValidationResult.prototype.SetDirty = function () {
        this.SetDirtyEx(this, true);
    };
    CompositeValidationResult.prototype.SetPristine = function () {
        this.SetDirtyEx(this, false);
    };
    CompositeValidationResult.prototype.SetDirtyEx = function (node, dirty) {
        if (node.Children.length === 0) {
            node["IsDirty"] = dirty;
        }
        else {
            for (var i = 0, len = node.Children.length; i < len; i++) {
                //stop if there are no children with errors
                this.SetDirtyEx(node.Children[i], dirty);
            }
        }
    };
    CompositeValidationResult.prototype.flattenErrors = function (node, errorCollection) {
        if (node.Children.length === 0) {
            if (node.HasErrors)
                errorCollection.push(node);
        }
        else {
            for (var i = 0, len = node.Children.length; i < len; i++) {
                //stop if there are no children with errors
                if (node.Children[i].HasErrors)
                    this.flattenErrors(node.Children[i], errorCollection);
            }
        }
    };
    // recursively traverse a (sub)tree
    CompositeValidationResult.prototype.traverse = function (node, indent) {
        console.log(Array(indent++).join("--") + node.Name + " (" + node.ErrorMessage + ")" + '\n\r');
        for (var i = 0, len = node.Children.length; i < len; i++) {
            this.traverse(node.Children[i], indent);
        }
    };
    CompositeValidationResult.prototype.add = function (child) { this.add(child); return true; };
    CompositeValidationResult.prototype.remove = function (child) { this.remove(child); return true; };
    CompositeValidationResult.prototype.getChildren = function () { return this.Children; };
    CompositeValidationResult.prototype.getName = function () { return this.Name; };
    CompositeValidationResult.prototype.isItem = function () { return false; };
    return CompositeValidationResult;
}());
exports.CompositeValidationResult = CompositeValidationResult;
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
}(CompositeValidationResult));
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/results.js.map