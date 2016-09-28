import { ValidationResult } from './results';
import {
  IValidator, IValidate, IAsyncValidate, IValidationFailure,
  IOptional, IError, IErrorTranslateArgs, IValidationResultVisitor
} from './interfaces';
import { ValidationFailure, Error } from './errors';

import * as Q from 'q';
import * as _ from 'underscore';
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
export class Validator extends ValidationResult implements IValidator {
  public Error: IError = new Error();
  public ValidationFailures: { [name: string]: IValidationFailure } = {};

  constructor(public Name: string, private ValidateFce?: IValidate, private AsyncValidationFce?: IAsyncValidate) {
    super(Name);
    this.ValidationFailures[this.Name] = new ValidationFailure(this.Error, false);

  }
  public Optional: IOptional;

  public Validate(context: any): IValidationFailure {
    var original = this.Error.HasError;
    if (this.ValidateFce !== undefined) this.ValidateFce.bind(context)(this.Error);
    if (original !== this.Error.HasError) this.DispatchErrorsChanged();
    return this.ValidationFailures[this.Name];
  }

  public ValidateAsync(context: any): Q.Promise<IValidationFailure> {
    var deferred = Q.defer<IValidationFailure>();

    if (this.AsyncValidationFce === undefined) {
      deferred.resolve(this.ValidationFailures[this.Name]);
    }
    else {
      var original = this.Error.HasError;
      var self = this;
      this.AsyncValidationFce.bind(context)(this.Error).then(function () {
        if (original !== self.Error.HasError) self.DispatchErrorsChanged();
        deferred.resolve(self.ValidationFailures[self.Name]);
      });
    }

    return deferred.promise;
  }

  public get HasError(): boolean {
    return this.HasErrors;
  }

  public get Errors() {
    return this.ValidationFailures;
  }
  public get HasErrors(): boolean {
    if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional()) return false;
    return this.Error.HasError;
  }

  public get ErrorCount(): number {
    return this.HasErrors ? 1 : 0;
  }
  public get ErrorMessage(): string {
    if (!this.HasErrors) return "";
    return this.Error.ErrorMessage;
  }

  public get TranslateArgs(): Array<IErrorTranslateArgs> {
    if (!this.HasErrors) return [];
    var newArray = [];
    newArray.push(this.Error.TranslateArgs);
    return newArray;
  }

  public AcceptVisitor(visitor: IValidationResultVisitor) {
    visitor.AddValidation(this);
  }
}
