import { IValidationResult, IOptional, IErrorTranslateArgs } from './interfaces';
import * as Utils from '../Utils';
/**
 *
 * @ngdoc object
 * @name  ValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents simple abstract error object.
 */
export declare class ValidationResult implements IValidationResult {
    Name: string;
    IsDirty: boolean;
    constructor(Name: string);
    readonly Children: Array<IValidationResult>;
    Add(error: IValidationResult): void;
    Remove(index: number): void;
    ErrorsChanged: Utils.ISignal<any>;
    DispatchErrorsChanged(): void;
    Optional: IOptional;
    TranslateArgs: Array<IErrorTranslateArgs>;
    readonly HasErrorsDirty: boolean;
    readonly HasErrors: boolean;
    readonly ErrorCount: number;
    readonly ErrorMessage: string;
    add(child: Utils.IComponent): boolean;
    remove(child: Utils.IComponent): boolean;
    getChildren(): Utils.IComponent[];
    getName(): string;
    isItem(): boolean;
}
/**
 *
 * @ngdoc object
 * @name  CompositeValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents composite error object.
 */
export declare class CompositeValidationResult implements IValidationResult {
    Name: string;
    Children: Array<IValidationResult>;
    constructor(Name: string);
    Optional: IOptional;
    ErrorsChanged: Utils.ISignal<any>;
    AddFirst(error: IValidationResult): void;
    Add(error: IValidationResult): void;
    Remove(index: number): void;
    Clear(): void;
    readonly HasErrorsDirty: boolean;
    readonly HasErrors: boolean;
    readonly ErrorCount: number;
    readonly ErrorMessage: string;
    readonly TranslateArgs: Array<IErrorTranslateArgs>;
    LogErrors(headerMessage?: string): void;
    readonly Errors: {
        [name: string]: IValidationResult;
    };
    private readonly FlattenErros;
    SetDirty(): void;
    SetPristine(): void;
    private SetDirtyEx(node, dirty);
    private flattenErrors(node, errorCollection);
    private traverse(node, indent);
    add(child: Utils.IComponent): boolean;
    remove(child: Utils.IComponent): boolean;
    getChildren(): Utils.IComponent[];
    getName(): string;
    isItem(): boolean;
}
