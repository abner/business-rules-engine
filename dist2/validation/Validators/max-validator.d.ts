import { IPropertyValidator } from './../Validation/interfaces';
/**
     * Return true only for these conditions
     * if 'Exclusive' is false, then the instance is valid if it is lower than, or equal to, the value of 'maximum';
     * if 'Exclusive' is true, the instance is valid if it is strictly lower than the value of 'maximum'.
     *
     *  @require underscore
     */
export declare class MaxValidator implements IPropertyValidator {
    Max: number;
    Exclusive: boolean;
    tagName: string;
    /**
     * Default constructor
     * @param Max - the value of 'maximum'
     * @param Exclusive - true = strictly lower, otherwise lower or equal to the value of 'maximum';
     */
    constructor(Max?: number, Exclusive?: boolean);
    isAcceptable(s: any): boolean;
}
