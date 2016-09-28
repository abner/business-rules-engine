import { ValidationResult } from './results';
import { IValidator, IValidate, IAsyncValidate, IValidationFailure, IOptional, IError, IErrorTranslateArgs, IValidationResultVisitor } from './interfaces';
import * as Q from 'q';
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
export declare class Validator extends ValidationResult implements IValidator {
    Name: string;
    private ValidateFce;
    private AsyncValidationFce;
    Error: IError;
    ValidationFailures: {
        [name: string]: IValidationFailure;
    };
    constructor(Name: string, ValidateFce?: IValidate, AsyncValidationFce?: IAsyncValidate);
    Optional: IOptional;
    Validate(context: any): IValidationFailure;
    ValidateAsync(context: any): Q.Promise<IValidationFailure>;
    readonly HasError: boolean;
    readonly Errors: {
        [name: string]: IValidationFailure;
    };
    readonly HasErrors: boolean;
    readonly ErrorCount: number;
    readonly ErrorMessage: string;
    readonly TranslateArgs: Array<IErrorTranslateArgs>;
    AcceptVisitor(visitor: IValidationResultVisitor): void;
}
