import { IPropertyValidator } from './../Validation/interfaces';
/**
 * Return true only for these conditions
 * if 'Exclusive' is false, then the instance is valid if it is greater than, or equal to, the value of 'minimum';
 * if 'Exclusive' is true, the instance is valid if it is strictly greater than the value of 'minimum'.
 *
 *  @require underscore
 */
export declare class MinValidator implements IPropertyValidator {
    Min: number;
    Exclusive: boolean;
    tagName: string;
    /**
     * Default constructor.
     * @param Min - the value of 'minimum'
     * @param Exclusive - true = strictly greater, otherwise greater or equal to the value of 'minimum';
     */
    constructor(Min?: number, Exclusive?: boolean);
    isAcceptable(s: any): boolean;
}
