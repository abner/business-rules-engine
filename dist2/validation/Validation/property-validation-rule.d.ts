/// <reference types="q" />
import * as Q from 'q';
import { IPropertyValidationRule, IValidationFailure, IPropertyValidator, IValidationResultVisitor, IErrorTranslateArgs } from './interfaces';
import { ValidationResult } from './results';
import { IValidationContext, ValidationFailuresMap } from './interfaces';
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
export declare class PropertyValidationRule<T> extends ValidationResult implements IPropertyValidationRule<T> {
    Name: string;
    Validators: {
        [name: string]: any;
    };
    ValidationFailures: ValidationFailuresMap;
    AcceptVisitor(visitor: IValidationResultVisitor): void;
    constructor(Name: string, validatorsToAdd?: Array<IPropertyValidator>);
    AddValidator(validator: any): void;
    readonly Errors: {
        [name: string]: IValidationFailure;
    };
    readonly HasErrors: boolean;
    readonly ErrorCount: number;
    readonly ErrorMessage: string;
    readonly TranslateArgs: Array<IErrorTranslateArgs>;
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    Validate(context: IValidationContext<T>): Array<IValidationFailure>;
    ValidateEx(value: any): Array<IValidationFailure>;
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAsync(context: IValidationContext<T>): Q.Promise<Array<IValidationFailure>>;
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAsyncEx(value: string): Q.Promise<Array<IValidationFailure>>;
}
