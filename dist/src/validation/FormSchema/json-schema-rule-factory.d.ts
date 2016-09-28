import { IValidationRuleFactory } from './validation-rule-factory.interface';
import * as Validation from '../Validation';
/**
 * It represents the JSON schema factory for creating validation rules based on JSON form schema.
 * It uses constraints keywords from JSON Schema Validation specification.
 */
export declare class JsonSchemaRuleFactory implements IValidationRuleFactory {
    private jsonSchema;
    /**
     * Default constructor
     * @param jsonSchema JSON schema for business rules.
     */
    constructor(jsonSchema: any);
    /**
     * Return abstract validation rule by traversing  JSON schema.
     * @returns {IAbstractValidator<any>} return validation rule
     */
    CreateAbstractValidator(): Validation.IAbstractValidator<any>;
    /**
     * Return concrete validation rule structured according to JSON schema.
     * @param name validation rule name
     * @returns {IAbstractValidationRule<any>} return validation rule
     */
    CreateRule(name: string): Validation.IAbstractValidationRule<any>;
    /**
     * Returns an concrete validation rules structured according to JSON schema.
     */
    private ParseAbstractRule(formSchema);
    /**
     * Return list of property validators that corresponds json items for JSON form validation tags.
     * See keywords specifications -> http://json-schema.org/latest/json-schema-validation.html
     */
    private ParseValidationAttribute(item);
}
