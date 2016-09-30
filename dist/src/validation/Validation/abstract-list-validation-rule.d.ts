import * as Q from 'q';
import { HashMap } from 'hashmap';
import { IValidationResult } from './interfaces';
import { AbstractValidationRule } from './abstract-validation-rule';
import { IAbstractListValidationRule, IAbstractValidationRule } from './interfaces';
import { AbstractValidator } from './abstract-validator';
/**
     *
     * @ngdoc object
     * @name  AbstractListValidationRule
     * @module Validation
     *
     *
     * @description
     * It represents an validator for custom object. It enables to assign rules to custom object properties.
     */
export declare class AbstractListValidationRule<T> extends AbstractValidationRule<T> implements IAbstractListValidationRule<T> {
    Name: string;
    validator: AbstractValidator<T>;
    RowsMap: HashMap<any, IAbstractValidationRule<T>>;
    constructor(Name: string, validator: AbstractValidator<T>);
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    Validate(context: any): IValidationResult;
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAsync(context: any): Q.Promise<IValidationResult>;
    readonly Rows: Array<IAbstractValidationRule<any>>;
    RefreshRows(list: Array<any>): void;
    private ClearRows(list);
    private ClearValidationResult(list);
    private getValidationRule(key, name?);
    private refreshList(list);
}
