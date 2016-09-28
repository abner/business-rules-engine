import { IPropertyValidator } from './../Validation/interfaces';
/**
     * Return true if an value is multiplier of passed number step, otherwise false.
     */
export declare class StepValidator implements IPropertyValidator {
    Step: string;
    tagName: string;
    private StepDefaultValue;
    /**
     * Default constructor.
     * @param Step - step multiplier
     */
    constructor(Step?: string);
    isAcceptable(s: any): boolean;
}
