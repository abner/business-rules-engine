import * as _ from 'underscore';
import * as Q from 'q';

import { IAbstractValidationRule, IValidationResult, IValidator, IPropertyValidationRule, IValidationResultVisitor, IValidatorFce, IOptional } from './interfaces';
import { AbstractValidator } from './abstract-validator';
import { CompositeValidationResult } from './results';
import { Validator } from './validator';
import { ValidationResultVisitor } from './validation-result-visitor';
import { PropertyValidationRule } from './property-validation-rule';
import { ValidationContext } from './validation-context';

/**
     *
     * @ngdoc object
     * @name  AbstractValidationRule
     * @module Validation
     *
     *
     * @description
     * It represents concreate validator for custom object. It enables to assign validation rules to custom object properties.
     */
export class AbstractValidationRule<T> implements IAbstractValidationRule<T> {
  public get ValidationResult(): IValidationResult { return this.ValidationResultVisitor.ValidationResult; }
  public set ValidationResult(value: IValidationResult) { this.ValidationResultVisitor.ValidationResult = value; }

  public Rules: { [name: string]: IPropertyValidationRule<T>; } = {};
  public Validators: { [name: string]: IValidator; } = {};
  public Children: { [name: string]: IAbstractValidationRule<any>; } = {};

  public ValidationResultVisitor: IValidationResultVisitor;
  public AcceptVisitor(visitor: IValidationResultVisitor) {
    visitor.AddValidator(this);
  }

  constructor(public Name: string, public validator: AbstractValidator<T>, public ForList?: boolean) {
    this.ValidationResultVisitor = new ValidationResultVisitor(new CompositeValidationResult(this.Name));
    if (!this.ForList) {
      _.each(this.validator.Validators, function (val, key) {
        this.createRuleFor(key);
        _.each(val, function (validator) {
          this.Rules[key].AddValidator(validator);
        }, this);
      }, this);

      _.each(this.validator.ValidationFunctions, function (val: Array<IValidatorFce>) {
        _.each(val, function (validation) {
          let validator = this.Validators[validation.Name];
          if (validator === undefined) {
            validator = new Validator(validation.Name, validation.ValidationFce, validation.AsyncValidationFce);
            this.Validators[validation.Name] = validator;
            validator.AcceptVisitor(this.ValidationResultVisitor);
            // this.ValidationResult.Add(validator);
          }
        }, this);
      }, this);

      this.addChildren();
    }
  }

  public addChildren() {
    _.each(this.validator.AbstractValidators, function (val, key) {
      let validationRule;
      if (val.ForList) {
        validationRule = val.CreateAbstractListRule(key);
      }
      else {
        validationRule = val.CreateAbstractRule(key);
      }
      this.Children[key] = validationRule;
      validationRule.AcceptVisitor(this.ValidationResultVisitor);
      // this.ValidationResult.Add(validationRule.ValidationResult);
    }, this);

  }

  public SetOptional(fce: IOptional) {

    this.ValidationResult.Optional = fce;
    _.each(this.Rules, function (value: IValidationResult, key: string) { value.Optional = fce; });
    _.each(this.Validators, function (value: any, key: string) { value.Optional = fce; });
    _.each(this.Children, function (value: any, key: string) { value.SetOptional(fce); });
  }

  private createRuleFor(prop: string) {
    let propValidationRule = new PropertyValidationRule(prop);
    this.Rules[prop] = propValidationRule;
    propValidationRule.AcceptVisitor(this.ValidationResultVisitor);
    // this.ValidationResult.Add(propValidationRule);

  }

  /**
   * Performs validation using a validation context and returns a collection of Validation Failures.
   */
  public Validate(context: T): IValidationResult {

    _.each(this.Children, function (val, key) {
      if (context[key] === undefined) context[key] = val.ForList ? [] : {};
      val.Validate(context[key]);
    }, this);


    for (let propName in this.Rules) {
      let rule = this.Rules[propName];
      rule.Validate(new ValidationContext(propName, context));
    }

    _.each(this.validator.ValidationFunctions, function (valFunctions: Array<IValidatorFce>) {
      _.each(valFunctions, function (valFce) {
        let validator = this.Validators[valFce.Name];
        if (validator !== undefined) validator.Validate(context);
      }, this);
    }, this);


    return this.ValidationResult;
  }

  /**
   * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
   */
  public ValidateAsync(context: T): Q.Promise<IValidationResult> {
    let deferred = Q.defer<IValidationResult>();

    let promises = [];
    _.each(this.Children, function (val, key) {
      promises.push(val.ValidateAsync(context[key]));
    }, this);

    for (let propName in this.Rules) {
      let rule = this.Rules[propName];
      promises.push(rule.ValidateAsync(new ValidationContext(propName, context)));
    }

    _.each(this.validator.ValidationFunctions, function (valFunctions: Array<IValidatorFce>) {
      _.each(valFunctions, function (valFce) {
        let validator = this.Validators[valFce.Name];
        if (validator !== undefined) promises.push(validator.ValidateAsync(context));
      }, this);
    }, this);

    let self = this;
    Q.all(promises).then(function (result) { deferred.resolve(self.ValidationResult); });

    return deferred.promise;
  }

  ValidateAll(context: T): Q.Promise<IValidationResult> {
    this.Validate(context);
    return this.ValidateAsync(context);
  }
  ValidateProperty(context: T, propName: string) {
    let childRule = this.Children[propName];
    if (childRule !== undefined) childRule.Validate(context[propName]);

    let rule = this.Rules[propName];
    if (rule !== undefined) {
      let valContext = new ValidationContext(propName, context);
      rule.Validate(valContext);
      rule.ValidateAsync(valContext);
    }
    let validationFces = this.validator.ValidationFunctions[propName];
    if (validationFces !== undefined) {
      _.each(validationFces, function (valFce) {
        let validator = this.Validators[valFce.Name];
        if (validator !== undefined) validator.Validate(context);
      }, this);
    }
  }
  static id: number = 0;

  public add(child: IAbstractValidationRule<T>): boolean {
    throw 'not implemented';
    // return false;
  }
  public remove(child: IAbstractValidationRule<T>): boolean {
    throw 'not implemented';
    // return false;
  }
  public getChildren(): IAbstractValidationRule<T>[] {
    return _.map(this.Children, function (item) {
      return item;
    });
  }
  public getName(): string {
    return this.Name;
  }
  public isItem(): boolean {
    return this.getChildren().length === 0;
  }

}
