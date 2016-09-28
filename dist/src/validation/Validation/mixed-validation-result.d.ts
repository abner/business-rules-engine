import { IValidationResult } from './interfaces';
import { CompositeValidationResult } from './results';
import { PropertyValidationRule } from './property-validation-rule';
import { ValidationFailuresMap } from './interfaces';
/**
 * It represents mixed validation rule for composite error object and property validation rule error.
 */
export declare class MixedValidationResult extends CompositeValidationResult implements IValidationResult {
    private Composite;
    private PropRule;
    constructor(Composite: IValidationResult, PropRule: PropertyValidationRule<any>);
    readonly Children: IValidationResult[];
    readonly ValidationFailures: ValidationFailuresMap;
    readonly HasErrorsDirty: boolean;
    readonly HasErrors: boolean;
    readonly ErrorCount: number;
    readonly ErrorMessage: string;
}
