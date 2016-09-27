
import { IError, IErrorTranslateArgs } from './interfaces';

/**
 *
 * @ngdoc object
 * @name  Error
 * @module Validation
 *
 *
 * @description
 * It represents basic error structure.
 */
export class Error implements IError {

  public HasError: boolean = false;
  public ErrorMessage: string = '';

  constructor() {

  }
}


/**
     *
     * @ngdoc object
     * @name  ValidationFailure
     * @module Validation
     *
     *
     * @description
     * It represents validation failure.
     */
export class ValidationFailure implements IError {
  constructor(public Error: IError, public IsAsync: boolean) {

  }
  public get HasError(): boolean { return this.Error.HasError; }
  public get ErrorMessage(): string { return this.Error.ErrorMessage; }
  public get TranslateArgs(): IErrorTranslateArgs { return this.Error.TranslateArgs; }


}
