import * as Validation from '../validation/Validation';
/**
 * @ngdoc object
 * @name RCValidator
 *
 * @requires moment
 * @requires underscore.string
 *
 * @description
 * Return true for valid birth day number in Czech Republic, otherwise return false.
 *
 * @example
 *
 * <pre>
 *
 *  //create validator
 *  let validator = new RCValidator();
 *
 *  //valid RC -> return true
 *  let result = validator.isAcceptable('800101/9999');
 *  //unvalid RC  -> return false
 *  let result = validator.isAcceptable('111111/1752');
 *
 * </pre>
 */
declare class RCValidator implements Validation.IPropertyValidator {
    tagName: string;
    isAcceptable(s: any): boolean;
}
export = RCValidator;
