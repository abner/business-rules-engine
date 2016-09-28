"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var results_1 = require('./results');
var errors_1 = require('./errors');
var Q = require('q');
var _ = require('underscore');
/**
     *
     * @ngdoc object
     * @name  Validator
     * @module Validation
     *
     *
     * @description
     * It represents a custom validator. It enables to define your own shared validation rules
     */
var Validator = (function (_super) {
    __extends(Validator, _super);
    function Validator(Name, ValidateFce, AsyncValidationFce) {
        _super.call(this, Name);
        this.Name = Name;
        this.ValidateFce = ValidateFce;
        this.AsyncValidationFce = AsyncValidationFce;
        this.Error = new errors_1.Error();
        this.ValidationFailures = {};
        this.ValidationFailures[this.Name] = new errors_1.ValidationFailure(this.Error, false);
    }
    Validator.prototype.Validate = function (context) {
        var original = this.Error.HasError;
        if (this.ValidateFce !== undefined)
            this.ValidateFce.bind(context)(this.Error);
        if (original !== this.Error.HasError)
            this.DispatchErrorsChanged();
        return this.ValidationFailures[this.Name];
    };
    Validator.prototype.ValidateAsync = function (context) {
        var deferred = Q.defer();
        if (this.AsyncValidationFce === undefined) {
            deferred.resolve(this.ValidationFailures[this.Name]);
        }
        else {
            var original = this.Error.HasError;
            var self = this;
            this.AsyncValidationFce.bind(context)(this.Error).then(function () {
                if (original !== self.Error.HasError)
                    self.DispatchErrorsChanged();
                deferred.resolve(self.ValidationFailures[self.Name]);
            });
        }
        return deferred.promise;
    };
    Object.defineProperty(Validator.prototype, "HasError", {
        get: function () {
            return this.HasErrors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "Errors", {
        get: function () {
            return this.ValidationFailures;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "HasErrors", {
        get: function () {
            if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional())
                return false;
            return this.Error.HasError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "ErrorCount", {
        get: function () {
            return this.HasErrors ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "ErrorMessage", {
        get: function () {
            if (!this.HasErrors)
                return "";
            return this.Error.ErrorMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validator.prototype, "TranslateArgs", {
        get: function () {
            if (!this.HasErrors)
                return [];
            var newArray = [];
            newArray.push(this.Error.TranslateArgs);
            return newArray;
        },
        enumerable: true,
        configurable: true
    });
    Validator.prototype.AcceptVisitor = function (visitor) {
        visitor.AddValidation(this);
    };
    return Validator;
}(results_1.ValidationResult));
exports.Validator = Validator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/validator.js.map