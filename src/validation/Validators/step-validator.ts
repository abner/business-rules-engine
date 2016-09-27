import { IPropertyValidator } from './../Validation/interfaces';
import { NumberFce } from './../Utils/number-fce';
/**
     * Return true if an value is multiplier of passed number step, otherwise false.
     */
export class StepValidator implements IPropertyValidator {

  tagName = 'step';

  private StepDefaultValue = '1';

  /**
   * Default constructor.
   * @param Step - step multiplier
   */
  constructor(public Step?: string) {
    if (Step === undefined) {
      this.Step = this.StepDefaultValue;
    }
  }

  isAcceptable(s: any) {
    let maxNegDigits = Math.max(NumberFce.GetNegDigits(s), NumberFce.GetNegDigits(this.Step));
    let multiplier = Math.pow(10, maxNegDigits);
    return (parseInt(s, 10) * multiplier) % (parseInt(this.Step, 10) * multiplier) === 0;
  }

}
