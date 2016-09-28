import { IAbstractValidator, IPropertyValidator, IValidatorFce, IAbstractValidationRule } from './interfaces';
import { AbstractValidationRule } from './abstract-validation-rule';
import { AbstractListValidationRule } from './abstract-list-validation-rule';
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
export class AbstractValidator<T> implements IAbstractValidator<T> {

  public Validators: { [name: string]: Array<IPropertyValidator>; } = {};
  public AbstractValidators: { [name: string]: IAbstractValidator<any>; } = {};
  public ValidationFunctions: { [name: string]: Array<IValidatorFce>; } = {};

  /**
   *  Register property validator for property.
   * @param prop - property name
   * @param validator - property validator
   */
  public RuleFor(prop: string, validator: IPropertyValidator) {
    if (this.Validators[prop] === undefined) {
      this.Validators[prop] = [];
    }

    this.Validators[prop].push(validator);
  }
  /**
   *  Register shared validation and assign property name as dependency on shared rule.
   *  Dependency = when the property is validated then the shared rule is validated also.
   * @param prop name
   * @param fce name validation function
   */
  public ValidationFor(prop: string, fce: IValidatorFce) {
    if (this.ValidationFunctions[prop] === undefined) {
      this.ValidationFunctions[prop] = [];
    }

    this.ValidationFunctions[prop].push(fce);
  }

  /**
   *  Register shared validation. There are no relationship to dependent property.
   *  Dependency = when the property is validated then the shared rule is validated also.
   * @param fce name validation function
   */
  public Validation(fce: IValidatorFce) {
    if (fce.Name === undefined) throw 'argument must have property Name';
    this.ValidationFor(fce.Name, fce);
  }

  /**
   * Register child validator for property - composition of validators
   * @param prop name
   * @param validator child validator
   * @param forList true if is array structure, otherwise false
   */
  public ValidatorFor<K>(prop: string, validator: IAbstractValidator<K>, forList?: boolean) {

    validator.ForList = forList;
    this.AbstractValidators[prop] = validator;
  }

  public CreateAbstractRule(name: string): IAbstractValidationRule<T> {
    return new AbstractValidationRule<T>(name, this);
  }
  public CreateAbstractListRule(name: string): IAbstractValidationRule<T> {
    return new AbstractListValidationRule<T>(name, this);
  }

  public CreateRule(name: string): IAbstractValidationRule<T> {
    return new AbstractValidationRule<T>(name, this);
  }


  /**
  * Return true if this validation rule is intended for list of items, otherwise true.
  */
  public ForList: boolean = false;

}
