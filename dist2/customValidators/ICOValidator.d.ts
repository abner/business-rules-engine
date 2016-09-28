import * as Validation from '../validation/Validation';
/**
 * @ngdoc object
 * @name ICOValidator
 *
 * @description
 * Return true for valid identification number of CZE company (called ico), otherwise return false.
 *
 * @example
 *
 * <pre>
 *  //create validator
 *  let validator = new IcoValidator();
 *
 *  //valid IC -> return true
 *  let result = validator.isAcceptable('12312312');
 *  //unvalid IC  -> return true
 *  let result = validator.isAcceptable('11111111');
 *
 * </pre>
 */
export declare class ICOValidator implements Validation.IPropertyValidator {
    /**
     * It checks validity of identification number of CZE company (called ico)
     * @param input {string} value to check
     * @returns {boolean} return true for valid value, otherwise false
     */
    isAcceptable(input: string): boolean;
    tagName: string;
}
