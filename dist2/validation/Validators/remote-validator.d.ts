/// <reference types="q" />
import * as Q from 'q';
import { IRemoteOptions, IAsyncPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if remote service returns true, otherwise false.
 *
 * @require underscore
 * @require Q
 * @require axios
 *
 * @example
 * ```typescript
 *  url: 'http://test/validateEmail',
 *  ```
 */
export declare class RemoteValidator implements IAsyncPropertyValidator {
    Options: IRemoteOptions;
    tagName: string;
    private axios;
    /**
     * Default constructor
     * @param Options - remote service url + options
     */
    constructor(Options?: IRemoteOptions);
    isAcceptable(s: any): Q.Promise<boolean>;
    isAsync: boolean;
}
