import { IPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if value is between Min and Max property.
 *
 *  @require underscore
 */
export declare class RangeValidator implements IPropertyValidator {
    Range: Array<number>;
    tagName: string;
    /**
     * Default constructor.
     * @param Range - array [the value of 'minimum', the value of 'maximum']
     */
    constructor(Range?: Array<number>);
    isAcceptable(s: any): boolean;
    /**
     * Return the value of 'minimum'
     * @returns {number}
     */
    readonly Min: number;
    /**
     * Return the value of 'maximum'
     * @returns {number}
     */
    readonly Max: number;
}
