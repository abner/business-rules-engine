import { IValidationContext } from './interfaces';
/**
*
* @ngdoc object
* @name  ValidationContext
* @module Validation
*
*
* @description
* It represents a data context for validation rule.
*/
export declare class ValidationContext<T> implements IValidationContext<T> {
    Key: string;
    Data: T;
    constructor(Key: string, Data: T);
    readonly Value: any;
}
