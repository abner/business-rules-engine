import { IComponent } from './../Utils/component.interface';
import { ISignal } from './../Utils/signal.interface';
import * as Q from 'q';
import HashMap = require('hashmap');
/**
     * Custom message functions.
     */
export interface IErrorCustomMessage {
    (config: any, args: any): string;
}
export interface ValidationFailuresMap {
    [name: string]: IValidationFailure;
}
/**
 * It represents a property validator for atomic object.
 */
export interface IPropertyValidator {
    isAcceptable(s: any): boolean;
    customMessage?: IErrorCustomMessage;
    tagName?: string;
}
/**
 * It represents a property validator for simple string value.
 */
export interface IStringValidator extends IPropertyValidator {
    isAcceptable(s: string): boolean;
}
/**
 * It represents an async property validator for atomic object.
 */
export interface IAsyncPropertyValidator {
    isAcceptable(s: any): Q.Promise<boolean>;
    customMessage?: IErrorCustomMessage;
    isAsync: boolean;
    tagName?: string;
}
/**
 * It represents an async property validator for simple string value.
 */
export interface IAsyncStringPropertyValidator extends IAsyncPropertyValidator {
    isAcceptable(s: string): Q.Promise<boolean>;
}
/**
     * basic error structure
     */
export interface IError {
    HasError: boolean;
    ErrorMessage: string;
    TranslateArgs?: IErrorTranslateArgs;
}
/**
 *  support for localization of error messages
 */
export interface IErrorTranslateArgs {
    TranslateId: string;
    MessageArgs: any;
    CustomMessage?: IErrorCustomMessage;
}
/**
 * It defines conditional function.
 */
export interface IOptional {
    (): boolean;
}
/**
 * It represents the validation result.
 */
export interface IValidationFailure extends IError {
    IsAsync: boolean;
    Error: IError;
}
/**
 * This class provides unit of information about error.
 * Implements composite design pattern to enable nesting of error information.
 */
export interface IValidationResult extends IComponent {
    /**
     * The name of error collection.
     */
    Name: string;
    /**
     * Add error information to child collection of errors.
     * @param validationResult - error information to be added.
     */
    Add(validationResult: IValidationResult): void;
    /**
     * Remove error information from child collection of errors.
     * @param index - index of error information to be removed.
     */
    Remove(index: number): void;
    /**
     * Return collections of child errors information.
     */
    Children: Array<IValidationResult>;
    /**
     * Return true if there is any error.
     */
    HasErrors: boolean;
    /**
     * Return true if there is any error and hasw dirty state.
     */
    HasErrorsDirty: boolean;
    /**
     * Return error message, if there is no error, return empty string.
     */
    ErrorMessage: string;
    /**
     * Return number of errors.
     */
    ErrorCount: number;
    /**
     * It enables to have errors optional.
     */
    Optional?: IOptional;
    /**
     * Occurs when the validation errors have changed for a property or for the entire entity.
     */
    ErrorsChanged: ISignal<any>;
    /**
     * It enables support for localization of error messages.
     */
    TranslateArgs?: Array<IErrorTranslateArgs>;
}
/**
* It defines validation function.
*/
export interface IValidate {
    (args: IError): void;
}
/**
 * It defines async validation function.
 */
export interface IAsyncValidate {
    (args: IError): Q.Promise<any>;
}
/**
 * It represents named validation function. It used to define shared validation rules.
 */
export interface IValidatorFce {
    /**
     * Return name for shared validation rule.
     */
    Name: string;
    /**
     * It defines validation function
     */
    ValidationFce?: IValidate;
    /**
     * It defines async validation function.
     */
    AsyncValidationFce?: IAsyncValidate;
}
/**
 * This class represents custom validator. It used to create shared validation rules.
 */
export interface IValidator {
    /**
     * It executes sync validation rules using a validation context and returns a collection of Validation Failures.
     */
    Validate(context: any): IValidationFailure;
    /**
     * It executes sync and async validation rules using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAsync(context: any): Q.Promise<IValidationFailure>;
    /**
     * Return validation failures.
     */
    Error: IError;
}
/**
 * It represents abstract validator for type of <T>.
 */
export interface IAbstractValidator<T> {
    /**
     *  Register property validator for property.
     * @param prop name
     * @param validator - property validator
     */
    RuleFor(prop: string, validator: IPropertyValidator): any;
    /**
     *  Register shared validation and assign property name as dependency on shared rule.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param prop name
     * @param validatorFce name validation function
     */
    ValidationFor(prop: string, validatorFce: IValidatorFce): any;
    /**
     *  Register shared validation. There are no relationship to dependent property.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param validatorFce name validation function
     */
    Validation(validatorFce: IValidatorFce): any;
    /**
     * Register child validator for property - composition of validators
     * @param prop name
     * @param validator child validator
     * @param forList true if is array structure, otherwise false
     */
    ValidatorFor<K>(prop: string, validator: IAbstractValidator<K>, forList?: boolean): any;
    /**
     * It creates new concrete validation rule and assigned data context to this rule.
     * @param name of the rule
     * @constructor
     */
    CreateRule(name: string): IAbstractValidationRule<any>;
    CreateAbstractRule(name: string): IAbstractValidationRule<any>;
    CreateAbstractListRule(name: string): IAbstractValidationRule<any>;
    /**
     * return true if this validation rule is intended for list of items, otherwise true
     */
    ForList: boolean;
}
/**
 * It represents concrete validation rule for type of <T>.
 */
export interface IAbstractValidationRule<T> extends IComponent {
    /**
     * It executes sync validation rules using a validation context and returns a collection of Validation Failures.
     */
    Validate(context: T): IValidationResult;
    /**
     * It executes async validation rules using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAsync(context: T): Q.Promise<IValidationResult>;
    /**
     * It executes sync and async validation rules using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAll(context: T): Q.Promise<IValidationResult>;
    /**
     * It executes sync and async validation rules for the passed property using a validation context.
     */
    ValidateProperty(context: T, propName: string): void;
    /**
     * Return validation results.
     */
    ValidationResult: IValidationResult;
    /**
     * Return property validation rules.
     */
    Rules: {
        [name: string]: IPropertyValidationRule<T>;
    };
    /**
     * Return shared validation rules.
     */
    Validators: {
        [name: string]: IValidator;
    };
    /**
     * Return child validators.
     */
    Children: {
        [name: string]: IAbstractValidationRule<any>;
    };
    /**
     * Return true if this validation rule is intended for list of items, otherwise true.
     */
    ForList?: boolean;
}
/**
 * It represents concrete validation rule for list of type of <T>.
 */
export interface IAbstractListValidationRule<T> {
    /**
     * Return map of rows of validation rules for collection-based structures (arrays).
     */
    RowsMap: HashMap<T, IAbstractValidationRule<T>>;
    /**
     *  Return rows of validation rules for collection-based structures (arrays).
     *
     */
    Rows: Array<IAbstractValidationRule<T>>;
    /**
     * Refresh (add or removes row from collection of validation rules based on passed data context).
     * @param list collection-based structure data
     */
    RefreshRows(context: Array<T>): any;
}
/**
 * It represents property validation rule for type of <T>.
 */
export interface IPropertyValidationRule<T> extends IValidationResult {
    /**
     *The validators that are grouped under this rule.
     */
    Validators: {
        [name: string]: any;
    };
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    Validate(context: IValidationContext<T>): Array<IValidationFailure>;
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAsync(context: IValidationContext<T>): Q.Promise<Array<IValidationFailure>>;
}
/**
 *  It represents a data context for validation rule.
 */
export interface IValidationContext<T> {
    /**
     * Return current value.
     */
    Value: string;
    /**
     * Return property name for current data context.
     */
    Key: string;
    /**
     * Data context for validation rule.
     */
    Data: T;
}
/**
 * It enables to create your own visitors for definition of various validation results.
 */
export interface IValidationResultVisitor {
    /**
     *  It creates (visits) validation result for validation rule for property.
     * @param IPropertyValidationRule - property validation rule.
     */
    AddRule(IPropertyValidationRule: any): any;
    /**
     *  It creates (visits) validation result for child validation rule.
     * @param IAbstractValidationRule - child validation rule
     */
    AddValidator(IAbstractValidationRule: any): any;
    /**
     *  It creates (visits) validation result for shared validation rule.
     * @param IValidator - shared validation rule
     */
    AddValidation(IValidator: any): any;
    ValidationResult: IValidationResult;
}
export interface IRemoteOptions {
    url: any;
    type?: string;
    data?: any;
}
