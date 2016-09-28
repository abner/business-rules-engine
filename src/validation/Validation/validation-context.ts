import { IValidationContext } from './interfaces';

/**
*
* @ngdoc object
* @name  ValidationContext
* @module Validation
*
*
* @description
* It represents a data context for validation rule.
*/
export class ValidationContext<T> implements IValidationContext<T> {

  constructor(public Key: string, public Data: T) {
  }
  public get Value(): any {
    return this.Data[this.Key];
  }
}
