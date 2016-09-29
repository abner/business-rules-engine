import { IPropertyValidator } from './../Validation/interfaces';
import * as _ from 'underscore';
import { CNPJValidator } from './cnpj-validator';
import { CPFValidator } from './cpf-validator';
/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
export class TypeValidator implements IPropertyValidator {

  tagName = 'type';

  private cnpjValidator: CNPJValidator = new CNPJValidator();
  private cpfValidator: CPFValidator = new CPFValidator();

  /*
   * Default constructor.
   * @param Type - keywords that defines an concrete type
   */
  constructor(public Type: string) {
    if (this.Type === undefined) {
      this.Type = 'string';
    }
  }

  isAcceptable(s: any) {
    switch (this.Type) {
      case 'string':
        return _.isString(s);
      case 'boolean':
        return _.isBoolean(s);
      case 'number':
        return _.isNumber(s);
      case 'date':
        return _.isDate(s);
      case 'integer':
        return /^\d+$/.test(s);
      case 'object':
        return _.isObject(s);
      case 'array':
        return _.isArray(s);
      case 'cnpj':
        return this.cnpjValidator.isAcceptable(s);
      case 'cpf':
        return this.cpfValidator.isAcceptable(s);
      case 'cpfcnpj':
        return this.cpfValidator.isAcceptable(s) || this.cnpjValidator.isAcceptable(s);
      case 'cnpjcpf':
        return this.cpfValidator.isAcceptable(s) || this.cnpjValidator.isAcceptable(s);
      default:
        return false;
    }
  }
}
