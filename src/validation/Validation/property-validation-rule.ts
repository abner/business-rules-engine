import * as _ from 'underscore';
import * as Q from 'q';

import {
  IPropertyValidationRule, IValidationFailure,
  IPropertyValidator, IValidationResultVisitor,
  IErrorTranslateArgs, IError
} from './interfaces';
import { ValidationFailure, Error } from './errors';
import { ValidationResult } from './results';
import { IValidationContext, IAsyncPropertyValidator, ValidationFailuresMap } from './interfaces';
import { MessageLocalization } from './message-localization';

/**
 *
 * @ngdoc object
 * @name  PropertyValidationRule
 * @module Validation
 *
 *
 * @description
 * It represents a property validation rule. The property has assigned collection of property validators.
 */
export class PropertyValidationRule<T> extends ValidationResult implements IPropertyValidationRule<T> {

  public Validators: { [name: string]: any } = {};
  public ValidationFailures: ValidationFailuresMap = {};
  // public AsyncValidationFailures:{[name:string]: IAsyncValidationFailure} = {};

  public AcceptVisitor(visitor: IValidationResultVisitor) {
    visitor.AddRule(this);
  }

  constructor(public Name: string, validatorsToAdd?: Array<IPropertyValidator>) {
    super(Name);


    for (let index in validatorsToAdd) {
      if (index) {
        this.AddValidator(validatorsToAdd[index]);
      }
    }


  }
  public AddValidator(validator: any) {
    this.Validators[validator.tagName] = validator;
    this.ValidationFailures[validator.tagName] = new ValidationFailure(new Error(), !!validator.isAsync);
  }


  public get Errors(): { [name: string]: IValidationFailure } {
    return this.ValidationFailures;
  }

  public get HasErrors(): boolean {
    if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional()) {
      return false;
    }
    return _.some(_.values(this.Errors), function (error) {
      return error.HasError;
    });
  }


  public get ErrorCount(): number {
    return this.HasErrors ? 1 : 0;
  }

  public get ErrorMessage(): string {
    if (!this.HasErrors) {
      return '';
    }
    return _.reduce(_.values(this.Errors), function (memo, error: IError) {
      return memo + error.ErrorMessage;
    }, '');
  }
  public get TranslateArgs(): Array<IErrorTranslateArgs> {
    if (!this.HasErrors) {
      return [];
    }
    let newArray = [];
    _.each(_.values(this.Errors), function (error: IValidationFailure) {
      if (error.HasError) {
        newArray.push(error.Error.TranslateArgs);
      }
    });
    return newArray;
  }

  /**
   * Performs validation using a validation context and returns a collection of Validation Failures.
   */
  Validate(context: IValidationContext<T>): Array<IValidationFailure> {
    try {
      return this.ValidateEx(context.Value);

    } catch (e) {
      // if (this.settings.debug && window.console) {
      console.log('Exception occurred when checking element ' + context.Key + '.', e);
      // }
      throw e;
    }
  }

  ValidateEx(value: any): Array<IValidationFailure> {

    let lastPriority = 0;
    let shortCircuited = false;

    let original = this.HasErrors;

    for (let index in this.ValidationFailures) {

      if (index) {
        let validation: IValidationFailure = this.ValidationFailures[index];
        if (validation.IsAsync) {
          continue;
        }

        let validator: IPropertyValidator = this.Validators[index];

        try {
          let priority = 0;
          if (shortCircuited && priority > lastPriority) {
            validation.Error.HasError = false;
          } else {

            let hasError = ((value === undefined || value === null) && validator.tagName !== 'required')
              ? false
              : !validator.isAcceptable(value);

            validation.Error.HasError = hasError;
            validation.Error.TranslateArgs = {
              TranslateId: validator.tagName,
              MessageArgs: _.extend(validator, { AttemptedValue: value }), CustomMessage: validator.customMessage
            };

            validation.Error.ErrorMessage = hasError ?
              MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : '';

            shortCircuited = hasError;
            lastPriority = priority;

          }

        } catch (e) {
          // if (this.settings.debug && window.console) {
          console.log('Exception occurred when checking element\'' + validator.tagName + '\' method.', e);
          // }
          throw e;
        }
      }
    }
    if (original !== this.HasErrors) { this.DispatchErrorsChanged(); }
    return _.filter(this.ValidationFailures, function (item) { return !item.IsAsync; });
  }


  /**
   * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
   */
  ValidateAsync(context: IValidationContext<T>): Q.Promise<Array<IValidationFailure>> {
    return this.ValidateAsyncEx(context.Value);
  }

  /**
   * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
   */
  ValidateAsyncEx(value: string): Q.Promise<Array<IValidationFailure>> {
    let deferred = Q.defer<Array<IValidationFailure>>();
    let promises = [];
    let original = this.HasErrors;
    let setResultFce = function (result, validator: IAsyncPropertyValidator, validation: IValidationFailure) {
      let hasError = !result;

      validation.Error.HasError = hasError;
      validation.Error.TranslateArgs = { TranslateId: validator.tagName, MessageArgs: _.extend(validator, { AttemptedValue: value }) };
      validation.Error.ErrorMessage = hasError ? MessageLocalization.GetValidationMessage(validation.Error.TranslateArgs.MessageArgs) : '';
    };

    for (let index in this.ValidationFailures) {
      if (index) {

        let validation: IValidationFailure = this.ValidationFailures[index];
        if (!validation.IsAsync) { continue; };
        let validator: IAsyncPropertyValidator = this.Validators[index];

        try {

          let hasErrorPromise = ((value === undefined || value === null) && validator.tagName !== 'required') ?
           Q.when(true) : validator.isAcceptable(value);
          hasErrorPromise.then((result) => setResultFce(result, validator, validation));

          promises.push(hasErrorPromise);

        } catch (e) {
          // if (this.settings.debug && window.console) {
          console.log('Exception occurred when checking element\'' + validator.tagName + '\' method.', e);
          // }
          throw e;
        }
      }
    }

    let self = this;
    Q.all(promises).then(function (result) {
      if (original !== self.HasErrors) { self.DispatchErrorsChanged(); };
      deferred.resolve(_.filter(self.ValidationFailures, function (item) { return item.IsAsync; }));
    });
    return deferred.promise;

  }
}
