import * as Validation from '../Validation';
/**
 * It represents factory that creates an concrete validation rule.
 */
export interface IValidationRuleFactory {
    /**
     * Create an validation rule
     * @param name - the name of rule
     */
    CreateRule(name: string): Validation.IAbstractValidationRule<any>;
    /**
     * Create an abstract validator.
     */
    CreateAbstractValidator(): Validation.IAbstractValidator<any>;
}
