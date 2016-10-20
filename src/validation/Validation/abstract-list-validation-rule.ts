import * as Q from 'q';
import * as _ from 'underscore';

import { IValidationResult } from './interfaces';
import { AbstractValidationRule } from './abstract-validation-rule';
import { IAbstractListValidationRule, IAbstractValidationRule } from './interfaces';
import { AbstractValidator } from './abstract-validator';

let HashMap: any =  require('hashmap').HashMap;

console.log('HASHMAP', HashMap);
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
export class AbstractListValidationRule<T> extends AbstractValidationRule<T> implements IAbstractListValidationRule<T>{

  public RowsMap = new HashMap();
  //private RowsObserver;
  constructor(public Name: string, public validator: AbstractValidator<T>) {
    super(Name, validator, true);
  }


  /**
   * Performs validation using a validation context and returns a collection of Validation Failures.
   */
  public Validate(context: any): IValidationResult {
    //super.Validate(context);

    this.RefreshRows(context);
    for (var i = 0; i != context.length; i++) {
      var validationRule = this.RowsMap.get(context[i]);
      if (validationRule !== undefined) validationRule.Validate(context[i]);
    }

    //this.ClearValidationResult(context);
    return this.ValidationResult;
  }

  /**
   * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
   */
  public ValidateAsync(context: any): Q.Promise<IValidationResult> {
    var deferred = Q.defer<IValidationResult>();

    var promises = [];

    this.RefreshRows(context);
    for (var i = 0; i != context.length; i++) {
      var validationRule = this.RowsMap.get(context[i]);
      if (validationRule !== undefined) promises.push(validationRule.ValidateAsync(context[i]));
    }
    var self = this;
    Q.all(promises).then(function (result) {
      //self.ClearValidationResult(context);
      deferred.resolve(self.ValidationResult);
    });

    return deferred.promise;
  }


  public get Rows(): Array<IAbstractValidationRule<any>> {
    return this.RowsMap.values();
  }
  public RefreshRows(list: Array<any>) {

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
  }
  private ClearRows(list: Array<any>) {
    var keysToRemove = _.difference(this.RowsMap.keys(), list);
    _.each(keysToRemove, function (key) {
      if (this.has(key)) this.remove(key);
    }, this.RowsMap);

  }
  private ClearValidationResult(list: Array<any>) {
    this.ClearRows(list);

    var results =
      _.map(this.RowsMap.values(), function (item: IAbstractValidationRule<any>) { return item.ValidationResult; });
    for (var i = this.ValidationResult.Children.length - 1; i >= 0; i--) {
      var item = this.ValidationResult.Children[i];
      if (item === undefined) continue;
      if (results.indexOf(item) === -1) {
        this.ValidationResult.Remove(i);
      }
    }
  }
  private getValidationRule(key: any, name?: string): IAbstractValidationRule<any> {
    if (name === undefined) name = "Row";
    var validationRule: IAbstractValidationRule<any>;
    if (!this.RowsMap.has(key)) {
      validationRule = this.validator.CreateAbstractRule(name);
      this.ValidationResult.Add(validationRule.ValidationResult);
      this.RowsMap.set(key, validationRule);
    }
    else {
      validationRule = this.RowsMap.get(key)
    }

    return validationRule;
  }
  private refreshList(list: Array<any>) {
    this.ClearValidationResult(list);
    _.each(list, function (item) { var rule = this.getValidationRule(item); }, this)
  }
}
