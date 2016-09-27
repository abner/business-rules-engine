import { IPropertyValidator } from './../Validation/interfaces';
import * as _ from 'underscore';

/**
 * Return true if an value is a specified type, otherwise false.
 *
 *  @require underscore
 */
export class TypeValidator implements IPropertyValidator {

  tagName = 'type';
  /**
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
      case 'integer':
        return /^\d+$/.test(s)
      case 'object':
        return _.isObject(s);
      case 'array':
        return _.isArray(s);
      default:
        return false;
    }
  }
}
