import { IValidationRuleFactory } from './validation-rule-factory.interface';
import * as Validation from '../Validation';
import * as Validators from '../Validators';
import * as _ from 'underscore';
import { RangeValidator } from './../Validators/range-validator';
/**
 * It represents the JSON schema factory for creating validation rules based on raw JSON data annotated by validation rules.
 * It uses constraints keywords from JQuery validation plugin.
 */
export class JQueryValidationRuleFactory implements IValidationRuleFactory {

  static RULES_KEY = 'rules';
  static DEFAULT_KEY = 'default';

  /**
   * Default constructor
   * @param metaData -  raw JSON data annotated by validation rules
   */
  constructor(private metaData: any) {
  }

  /**
   * Return abstract validation rule by traversing raw JSON data annotated by validation rules.
   * @returns {IAbstractValidator<any>} return validation rule
   */
  public CreateAbstractValidator(): Validation.IAbstractValidator<any> {
    return this.ParseAbstractRule(this.metaData);
  }

  /**
   * Return an concrete validation rule by traversing raw JSON data annotated by validation rules.
   * @param name validation rule name
   * @returns {IValidationRule<any>} return validation rule
   */
  public CreateRule(name: string): Validation.IAbstractValidationRule<any> {
    return this.ParseAbstractRule(this.metaData).CreateRule(name);
  }

  /**
   * Returns an concrete validation rule structured according to JSON schema.
   */
  private ParseAbstractRule(metaData: any): Validation.IAbstractValidator<any> {

    let rule = new Validation.AbstractValidator<any>();

    for (let key in metaData) {
      let item = metaData[key];
      let rules = item[JQueryValidationRuleFactory.RULES_KEY];

      if (_.isArray(item)) {
        if (item[1] !== undefined) {
          _.each(this.ParseValidationAttribute(item[1]), function (validator) {
            rule.RuleFor(key, validator);
          });
        }
        rule.ValidatorFor(key, this.ParseAbstractRule(item[0]), true);
      }
      else if (rules !== undefined) {
        _.each(this.ParseValidationAttribute(rules), function (validator) { rule.RuleFor(key, validator); });
      }
      else if (_.isObject(item)) {
        rule.ValidatorFor(key, this.ParseAbstractRule(item));
      }
      else {
        // ignore
        continue;
      }
    }
    return rule;
  }

  /**
   * Return list of property validators that corresponds json items for JQuery validation pluging tags.
   * See specification - http://jqueryvalidation.org/documentation/
   */
  private ParseValidationAttribute(item: any): Array<any> {

    let validators = new Array<any>();
    if (item === undefined) return validators;

    let validation = item['required'];
    if (validation !== undefined && validation) {
      validators.push(new Validators.RequiredValidator());
    }

    validation = item['remote'];
    if (validation !== undefined && validation) {
      validators.push(new Validators.RemoteValidator(validation));
    }

    // maxLength validation
    validation = item['maxlength'];
    if (validation !== undefined) {
      validators.push(new Validators.MaxLengthValidator(validation));
    }

    // minLength validation
    validation = item['minlength'];
    if (validation !== undefined) {
      validators.push(new Validators.MinLengthValidator(validation));
    }

    // rangelength validation
    validation = item['rangelength'];
    if (validation !== undefined) {
      validators.push(new Validators.RangeLengthValidator(validation));
    }

    // maximum validation
    validation = item['max'];
    if (validation !== undefined) {
      validators.push(new Validators.MaxValidator(validation));
    }

    // minimum validation
    validation = item['min'];
    if (validation !== undefined) {
      validators.push(new Validators.MinValidator(validation));
    }

    // range validation
    validation = item['range'];
    if (validation !== undefined) {
      validators.push(new Validators.RangeValidator(validation));
    }

    validation = item['email'];
    if (validation !== undefined) {
      validators.push(new Validators.EmailValidator());
    }

    validation = item['url'];
    if (validation !== undefined) {
      validators.push(new Validators.UrlValidator());
    }

    validation = item['date'];
    if (validation !== undefined) {
      validators.push(new Validators.DateValidator());
    }

    validation = item['dateISO'];
    if (validation !== undefined) {
      validators.push(new Validators.DateISOValidator());
    }

    validation = item['number'];
    if (validation !== undefined) {
      validators.push(new Validators.NumberValidator());
    }


    validation = item['digits'];
    if (validation !== undefined) {
      validators.push(new Validators.DigitValidator());
    }

    validation = item['creditcard'];
    if (validation !== undefined) {
      validators.push(new Validators.CreditCardValidator());
    }

    validation = item['equalTo'];
    if (validation !== undefined) {
      validators.push(new Validators.EqualToValidator(validation));
    }


    // min items validation
    validation = item['minItems'];
    if (validation !== undefined) {
      validators.push(new Validators.MinItemsValidator(validation));
    }

    // max items validation
    validation = item['maxItems'];
    if (validation !== undefined) {
      validators.push(new Validators.MaxItemsValidator(validation));
    }

    // uniqueItems validation
    validation = item['uniqueItems'];
    if (validation !== undefined) {
      validators.push(new Validators.UniqItemsValidator());
    }

    // enum validation
    validation = item['enum'];
    if (validation !== undefined) {
      validators.push(new Validators.EnumValidator(validation));
    }

    //           // pattern validation
    //           validation = item['pattern'];
    //           if (validation !== undefined) {
    //               validators.push(new Validators.PatternValidator(validation))
    //           }

    return validators;
  }
}
