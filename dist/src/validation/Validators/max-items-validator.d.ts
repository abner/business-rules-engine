import { IPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if an number of items in array is greater or equal to the value of 'maximum'.
 *
 *  @require underscore
 */
export declare class MaxItemsValidator implements IPropertyValidator {
    Max: number;
    tagName: string;
    /**
     * Default constructor.
     * @param Max - the value of 'maximum'
     */
    constructor(Max?: number);
    isAcceptable(s: any): boolean;
}
