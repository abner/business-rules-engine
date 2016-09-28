import { IPropertyValidationRule, IValidationResult } from './interfaces';
import { CompositeValidationResult } from './results';
import { ValidationFailure } from './errors';
import { PropertyValidationRule } from './property-validation-rule';

/**
 * It represents mixed validation rule for composite error object and property validation rule error.
 */
export class MixedValidationResult extends CompositeValidationResult implements IValidationResult {

  constructor(private Composite: IValidationResult, private PropRule: PropertyValidationRule<any>) {
    super(Composite.Name);


  }

  public get Children() { return this.Composite.Children; }
  public get ValidationFailures() { return this.PropRule.ValidationFailures; }

  public get HasErrorsDirty(): boolean {
    if (this.Composite.HasErrorsDirty) return true;
    if (this.PropRule !== undefined && this.PropRule.HasErrorsDirty) return true;
    return false;
  }

  get HasErrors(): boolean {
    if (this.Composite.HasErrors) return true;
    if (this.PropRule !== undefined && this.PropRule.HasErrors) return true;
    return false;
  }
  public get ErrorCount(): number {
    if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors) return 0;
    return this.Composite.ErrorCount + (this.PropRule !== undefined ? this.PropRule.ErrorCount : 0);
  }
  public get ErrorMessage(): string {
    if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors) return "";
    this.Composite.ErrorMessage + this.PropRule !== undefined ? this.PropRule.ErrorMessage : "";
  }
}
