import { IPropertyValidator } from '../Validation/interfaces';
/**
 * Return true if a numeric instance is valid against 'multipleOf' if the result of the division of the instance by this keyword's value is an integer, otherwise false.
 *
 *  @require underscore
 */
export declare class MultipleOfValidator implements IPropertyValidator {
    Divider: number;
    tagName: string;
    private MultipleOfDefaultValue;
    /**
     * Default constructor
     * @param Divider
     */
    constructor(Divider?: number);
    isAcceptable(s: any): boolean;
}
