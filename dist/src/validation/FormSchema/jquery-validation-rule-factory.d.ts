import { IValidationRuleFactory } from './validation-rule-factory.interface';
import * as Validation from '../Validation';
/**
 * It represents the JSON schema factory for creating validation rules based on raw JSON data annotated by validation rules.
 * It uses constraints keywords from JQuery validation plugin.
 */
export declare class JQueryValidationRuleFactory implements IValidationRuleFactory {
    private metaData;
    static RULES_KEY: string;
    static DEFAULT_KEY: string;
    /**
     * Default constructor
     * @param metaData -  raw JSON data annotated by validation rules
     */
    constructor(metaData: any);
    /**
     * Return abstract validation rule by traversing raw JSON data annotated by validation rules.
     * @returns {IAbstractValidator<any>} return validation rule
     */
    CreateAbstractValidator(): Validation.IAbstractValidator<any>;
    /**
     * Return an concrete validation rule by traversing raw JSON data annotated by validation rules.
     * @param name validation rule name
     * @returns {IValidationRule<any>} return validation rule
     */
    CreateRule(name: string): Validation.IAbstractValidationRule<any>;
    /**
     * Returns an concrete validation rule structured according to JSON schema.
     */
    private ParseAbstractRule(metaData);
    /**
     * Return list of property validators that corresponds json items for JQuery validation pluging tags.
     * See specification - http://jqueryvalidation.org/documentation/
     */
    private ParseValidationAttribute(item);
}
