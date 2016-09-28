import * as Validation from '../validation/Validation';
/**
 * @ngdoc object
 * @name CNPJValidator
 *
 * @description
 * Return true for valid cpf, otherwise return false.
 *
 * @example
 *
 * <pre>
 *  //create validator
 *  let validator = new CNPJValidator();
 *
 *  //valid CNPJ -> return true
 *  let result = validator.isAcceptable('00000000000191');
 *  //unvalid CNPJ  -> return false
 *  let result = validator.isAcceptable('00000000000192');
 *
 * </pre>
 */
export declare class CNPJValidator implements Validation.IPropertyValidator {
    /**
     * It checks validity of identification number of CZE company (called ico)
     * @param input {string} value to check
     * @returns {boolean} return true for valid value, otherwise false
     */
    isAcceptable(input: string): boolean;
    tagName: string;
}
