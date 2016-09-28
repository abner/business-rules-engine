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
export declare class Error implements IError {
    HasError: boolean;
    ErrorMessage: string;
    constructor();
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
export declare class ValidationFailure implements IError {
    Error: IError;
    IsAsync: boolean;
    constructor(Error: IError, IsAsync: boolean);
    readonly HasError: boolean;
    readonly ErrorMessage: string;
    readonly TranslateArgs: IErrorTranslateArgs;
}
