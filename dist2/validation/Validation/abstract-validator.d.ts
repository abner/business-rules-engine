import { IAbstractValidator, IPropertyValidator, IValidatorFce, IAbstractValidationRule } from './interfaces';
/**
  *
  * @ngdoc object
  * @name  AbstractValidator
  * @module Validation
  *
  *
  * @description
  * It enables to create custom validator for your own abstract object (class) and to assign validation rules to its properties.
  * You can assigned these rules
  *
  * +  register property validation rules - use _RuleFor_ property
  * +  register property async validation rules - use _RuleFor_ property
  * +  register shared validation rules - use _Validation_ or _ValidationFor_ property
  * +  register custom object validator - use _ValidatorFor_ property - enables composition of child custom validators
  */
export declare class AbstractValidator<T> implements IAbstractValidator<T> {
    Validators: {
        [name: string]: Array<IPropertyValidator>;
    };
    AbstractValidators: {
        [name: string]: IAbstractValidator<any>;
    };
    ValidationFunctions: {
        [name: string]: Array<IValidatorFce>;
    };
    /**
     *  Register property validator for property.
     * @param prop - property name
     * @param validator - property validator
     */
    RuleFor(prop: string, validator: IPropertyValidator): void;
    /**
     *  Register shared validation and assign property name as dependency on shared rule.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param prop name
     * @param fce name validation function
     */
    ValidationFor(prop: string, fce: IValidatorFce): void;
    /**
     *  Register shared validation. There are no relationship to dependent property.
     *  Dependency = when the property is validated then the shared rule is validated also.
     * @param fce name validation function
     */
    Validation(fce: IValidatorFce): void;
    /**
     * Register child validator for property - composition of validators
     * @param prop name
     * @param validator child validator
     * @param forList true if is array structure, otherwise false
     */
    ValidatorFor<K>(prop: string, validator: IAbstractValidator<K>, forList?: boolean): void;
    CreateAbstractRule(name: string): IAbstractValidationRule<T>;
    CreateAbstractListRule(name: string): IAbstractValidationRule<T>;
    CreateRule(name: string): IAbstractValidationRule<T>;
    /**
    * Return true if this validation rule is intended for list of items, otherwise true.
    */
    ForList: boolean;
}
