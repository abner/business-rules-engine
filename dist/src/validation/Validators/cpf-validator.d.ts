import * as Validation from '../Validation';
/**
 * @ngdoc object
 * @name CPFValidator
 *
 * @description
 * Return true for valid cpf, otherwise return false.
 *
 * @example
 *
 * <pre>
 *  //create validator
 *  let validator = new CPFValidator();
 *
 *  //valid CPF -> return true
 *  let result = validator.isAcceptable('42752206259');
 *  //unvalid IC  -> return false
 *  let result = validator.isAcceptable('11111111111');
 *
 * </pre>
 */
export declare class CPFValidator implements Validation.IPropertyValidator {
    /**
     * It checks validity of identification number of CZE company (called ico)
     * @param input {string} value to check
     * @returns {boolean} return true for valid value, otherwise false
     */
    isAcceptable(input: string): boolean;
    tagName: string;
}
