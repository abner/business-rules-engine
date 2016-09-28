"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Q = require('q');
var _ = require('underscore');
var HashMap = require('hashmap');
var abstract_validation_rule_1 = require('./abstract-validation-rule');
/**
     *
     * @ngdoc object
     * @name  AbstractListValidationRule
     * @module Validation
     *
     *
     * @description
     * It represents an validator for custom object. It enables to assign rules to custom object properties.
     */
var AbstractListValidationRule = (function (_super) {
    __extends(AbstractListValidationRule, _super);
    //private RowsObserver;
    function AbstractListValidationRule(Name, validator) {
        _super.call(this, Name, validator, true);
        this.Name = Name;
        this.validator = validator;
        this.RowsMap = new HashMap();
    }
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    AbstractListValidationRule.prototype.Validate = function (context) {
        //super.Validate(context);
        this.RefreshRows(context);
        for (var i = 0; i != context.length; i++) {
            var validationRule = this.RowsMap.get(context[i]);
            if (validationRule !== undefined)
                validationRule.Validate(context[i]);
        }
        //this.ClearValidationResult(context);
        return this.ValidationResult;
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    AbstractListValidationRule.prototype.ValidateAsync = function (context) {
        var deferred = Q.defer();
        var promises = [];
        this.RefreshRows(context);
        for (var i = 0; i != context.length; i++) {
            var validationRule = this.RowsMap.get(context[i]);
            if (validationRule !== undefined)
                promises.push(validationRule.ValidateAsync(context[i]));
        }
        var self = this;
        Q.all(promises).then(function (result) {
            //self.ClearValidationResult(context);
            deferred.resolve(self.ValidationResult);
        });
        return deferred.promise;
    };
    Object.defineProperty(AbstractListValidationRule.prototype, "Rows", {
        get: function () {
            return this.RowsMap.values();
        },
        enumerable: true,
        configurable: true
    });
    AbstractListValidationRule.prototype.RefreshRows = function (list) {
        this.refreshList(list);
        //            var self = this;
        //            this.RowsObserver = new ObserveJs.ArrayObserver(list, function(splices) {
        //                // respond to changes to the elements of arr.
        //                splices.forEach(function(splice) {
        //                    //var newContext = ObserveJs.ArrayObserver.applySplices(splice, context);
        //                    var newList = list.splice.apply(list,[splice.index,splice.removed.length].concat(splice.added));
        //                    self.refreshList(newList);
        //                });
        //            });
    };
    AbstractListValidationRule.prototype.ClearRows = function (list) {
        var keysToRemove = _.difference(this.RowsMap.keys(), list);
        _.each(keysToRemove, function (key) {
            if (this.has(key))
                this.remove(key);
        }, this.RowsMap);
    };
    AbstractListValidationRule.prototype.ClearValidationResult = function (list) {
        this.ClearRows(list);
        var results = _.map(this.RowsMap.values(), function (item) { return item.ValidationResult; });
        for (var i = this.ValidationResult.Children.length - 1; i >= 0; i--) {
            var item = this.ValidationResult.Children[i];
            if (item === undefined)
                continue;
            if (results.indexOf(item) === -1) {
                this.ValidationResult.Remove(i);
            }
        }
    };
    AbstractListValidationRule.prototype.getValidationRule = function (key, name) {
        if (name === undefined)
            name = "Row";
        var validationRule;
        if (!this.RowsMap.has(key)) {
            validationRule = this.validator.CreateAbstractRule(name);
            this.ValidationResult.Add(validationRule.ValidationResult);
            this.RowsMap.set(key, validationRule);
        }
        else {
            validationRule = this.RowsMap.get(key);
        }
        return validationRule;
    };
    AbstractListValidationRule.prototype.refreshList = function (list) {
        this.ClearValidationResult(list);
        _.each(list, function (item) { var rule = this.getValidationRule(item); }, this);
    };
    return AbstractListValidationRule;
}(abstract_validation_rule_1.AbstractValidationRule));
exports.AbstractListValidationRule = AbstractListValidationRule;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/abstract-list-validation-rule.js.map