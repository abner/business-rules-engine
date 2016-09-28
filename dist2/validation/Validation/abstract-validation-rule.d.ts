/// <reference types="q" />
import * as Q from 'q';
import { IAbstractValidationRule, IValidationResult, IValidator, IPropertyValidationRule, IValidationResultVisitor, IOptional } from './interfaces';
import { AbstractValidator } from './abstract-validator';
/**
     *
     * @ngdoc object
     * @name  AbstractValidationRule
     * @module Validation
     *
     *
     * @description
     * It represents concreate validator for custom object. It enables to assign validation rules to custom object properties.
     */
export declare class AbstractValidationRule<T> implements IAbstractValidationRule<T> {
    Name: string;
    validator: AbstractValidator<T>;
    ForList: boolean;
    ValidationResult: IValidationResult;
    Rules: {
        [name: string]: IPropertyValidationRule<T>;
    };
    Validators: {
        [name: string]: IValidator;
    };
    Children: {
        [name: string]: IAbstractValidationRule<any>;
    };
    ValidationResultVisitor: IValidationResultVisitor;
    AcceptVisitor(visitor: IValidationResultVisitor): void;
    constructor(Name: string, validator: AbstractValidator<T>, ForList?: boolean);
    addChildren(): void;
    SetOptional(fce: IOptional): void;
    private createRuleFor(prop);
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures.
     */
    Validate(context: T): IValidationResult;
    /**
     * Performs validation using a validation context and returns a collection of Validation Failures asynchronoulsy.
     */
    ValidateAsync(context: T): Q.Promise<IValidationResult>;
    ValidateAll(context: T): Q.Promise<IValidationResult>;
    ValidateProperty(context: T, propName: string): void;
    static id: number;
    add(child: IAbstractValidationRule<T>): boolean;
    remove(child: IAbstractValidationRule<T>): boolean;
    getChildren(): IAbstractValidationRule<T>[];
    getName(): string;
    isItem(): boolean;
}
