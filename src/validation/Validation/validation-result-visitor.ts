import { IValidationResultVisitor, IValidationResult, IPropertyValidationRule, IAbstractValidationRule } from './interfaces';
import { MixedValidationResult } from './mixed-validation-result';
import { Validator } from './validator';
import * as _ from 'underscore';
/**
 *  It represents visitor class that enables to separate validation result creation from validation execution.
 *  You can create your own Visitors for composing ValidationResults on your own.
 */
export class ValidationResultVisitor implements IValidationResultVisitor {

  constructor(public ValidationResult: IValidationResult) {

  }

  public AddRule(rule: IPropertyValidationRule<any>) {
    // if (this.ValidationResult.ErrorsChanged !== undefined) rule.ErrorsChanged = this.ValidationResult.ErrorsChanged;
    this.ValidationResult.Add(rule);
  }

  public AddValidator(rule: IAbstractValidationRule<any>) {
    // mixed composite validation result with property validation error
    // TODO: find better and more generic way how to solve mixed validation results with the same name
    let error: any = _.find(this.ValidationResult.Children, function (item: IValidationResult) { return item.Name === rule.ValidationResult.Name; });
    if (error !== undefined) {
      // compose composite validation result with property validation result
      this.ValidationResult.Add(new MixedValidationResult(rule.ValidationResult, error));
    }
    else {
      this.ValidationResult.Add(rule.ValidationResult);
    }
  }
  public AddValidation(validator: Validator) {
    this.ValidationResult.Add(validator);
  }
}
