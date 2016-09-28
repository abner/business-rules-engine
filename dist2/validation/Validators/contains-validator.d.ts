/// <reference types="q" />
import * as Q from 'q';
import { IAsyncPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 * Predefined values are fetched async with options service.
 *
 * @require underscore
 * @require Q
 */
export declare class ContainsValidator implements IAsyncPropertyValidator {
    Options: Q.Promise<Array<any>>;
    isAsync: boolean;
    tagName: string;
    /**
     * Default constructor.
     * @param Options - async service that returns array of values.
     *
     *
     */
    constructor(Options: Q.Promise<Array<any>>);
    isAcceptable(s: string): Q.Promise<boolean>;
}
