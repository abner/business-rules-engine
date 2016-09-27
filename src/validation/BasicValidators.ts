///<reference path='../../typings/underscore/underscore.d.ts'/>
///<reference path='../../typings/q/Q.d.ts'/>
///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/business-rules-engine/Validation.d.ts'/>


import Q = require("q");
import _ = require("underscore");
import Validation = require("./Validation");



    /**
     * Return true if a numeric instance is valid against "multipleOf" if the result of the division of the instance by this keyword's value is an integer, otherwise false.
     *
     *  @require underscore
     */
    export class MultipleOfValidator implements Validation.IPropertyValidator {
        private MultipleOfDefaultValue = 1;

        /**
         * Default constructor
         * @param Divider
         */
        constructor(public Divider?:number) {
            if (Divider === undefined) this.Divider = this.MultipleOfDefaultValue;
        }

        isAcceptable(s:any) {
            if (!_.isNumber(s)) return false;
            return (s % this.Divider) % 1 === 0;
        }

        tagName = "multipleOf";
    }
    /**
     * Return true if an value is valid against specified pattern, otherwise false.
     */
    export class PatternValidator implements Validation.IStringValidator {

        /**
         * Default constructor.
         * @param Pattern - pattern
         */
        constructor(public Pattern?:string) {
        }

        isAcceptable(s:string) {
            return new RegExp(this.Pattern).test(s);
        }

        tagName = "pattern";
    }

    /**
     * Return true if an value is any of predefined values (using strict equality), otherwise false.
     * Predefined values are fetched async with options service.
     *
     * @require underscore
     * @require Q
     */
    export class ContainsValidator implements Validation.IAsyncPropertyValidator {

        /**
         * Default constructor.
         * @param Options - async service that returns array of values.
         *
         *
         */
        constructor(public Options:Q.Promise<Array<any>>) {
            if (Options === undefined) this.Options = Q.when([]);
        }

        isAcceptable(s:string):Q.Promise<boolean> {
            var deferred:Q.Deferred<boolean> = Q.defer<boolean>();

            this.Options.then(function (result) {
                var hasSome = _.some(result, function (item) {
                    return item === s;
                });
                if (hasSome) deferred.resolve(true);
                deferred.resolve(false);
            });

            return deferred.promise;
        }

        isAsync = true;
        tagName = "contains";
    }

    export interface IRemoteOptions{
        url:any;
        type?:string;
        data?:any;
    }
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
    export class RemoteValidator implements Validation.IAsyncPropertyValidator {
        private axios:any;
        /**
         * Default constructor
         * @param Options - remote service url + options
         */
        constructor(public Options?:IRemoteOptions) {

            this.axios = require('axios');
        }

        isAcceptable(s:any):Q.Promise<boolean> {
            var deferred:Q.Deferred<boolean> = Q.defer<boolean>();

            this.axios.post(this.Options.url,
                {
                    method: this.Options.type || "get",
                    data: _.extend({} || this.Options.data, {
                        "value": s
                    })
                }
            ).then(function (response) {
                    var isAcceptable = response === true || response === "true";
                    deferred.resolve(isAcceptable);
                })
                .catch(function (response) {
                    deferred.resolve(false);
                    console.log(response);
                });

            return deferred.promise;
        }
        isAsync = true;
        tagName = "remote";
    }
}
export = Validators;

