import { IValidationResultVisitor, IValidationResult, IPropertyValidationRule, IAbstractValidationRule } from './interfaces';
import { Validator } from './validator';
/**
 *  It represents visitor class that enables to separate validation result creation from validation execution.
 *  You can create your own Visitors for composing ValidationResults on your own.
 */
export declare class ValidationResultVisitor implements IValidationResultVisitor {
    ValidationResult: IValidationResult;
    constructor(ValidationResult: IValidationResult);
    AddRule(rule: IPropertyValidationRule<any>): void;
    AddValidator(rule: IAbstractValidationRule<any>): void;
    AddValidation(validator: Validator): void;
}
