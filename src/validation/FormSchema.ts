import { ValidationFailure } from './Validation/errors';

import * as _ from 'underscore';
import * as Q from 'q';

import * as Validation from './Validation';
import * as Validator from './Validators';



//var Validation = require("business-rules-engine");
//var Validators = require('business-rules-engine/commonjs/BasicValidators');

//var Validation = require('../validation/Validation.js');
//var Validators = require('../validation/BasicValidators.js');
/**
 * Support for declarative validation rules definition.
 *
 *  +  declarative [JSON schema](http://json-schema.org/) with validation keywords [JSON Schema Validation](http://json-schema.org/latest/json-schema-validation.html)
 *  +  declarative raw JSON data  annotated with meta data - using keywords from [JQuery validation plugin](http://jqueryvalidation.org/)
 */
module FormSchema {





    



    /**
     * It represents utility for JSON schema form manipulation.
     */
    export class Util {

        static TYPE_KEY = "type";
        static PROPERTIES_KEY = "properties";
        static DEFAULT_KEY = "default";
        static ARRAY_KEY = "items";

        /**
         * Returns the initial JSON data structured according to JSON schema.
         * The data are initilizied with default values.
         */
        static InitValues(formSchema:any, data?:any) {
            var data = data || {};

            for (var key in formSchema) {
                var item = formSchema[key];
                var type = item[Util.TYPE_KEY];
                if (type === "object") {
                    data[key] = {};
                    Util.InitValues(item[Util.PROPERTIES_KEY], data[key]);
                }
                else if (type === "array") {
                    data[key] = [];
                }
                else {
                    var defaultValue = item[Util.DEFAULT_KEY];
                    if (defaultValue === undefined) continue;

                    // Type casting
                    if (type === 'boolean') {
                        if (defaultValue === '0') {
                            defaultValue = false;
                        } else {
                            defaultValue = !!defaultValue;
                        }
                    }
                    if ((type === 'number') ||
                        (type === 'integer')) {
                        if (_.isString(defaultValue)) {
                            if (!defaultValue.length) {
                                defaultValue = null;
                            } else if (!isNaN(Number(defaultValue))) {
                                defaultValue = Number(defaultValue);
                            }
                        }
                    }
                    if ((type === 'string') &&
                        (defaultValue === '')) {
                        defaultValue = null;
                    }

                    //TODO: default value
                    data[key] = defaultValue;

                }
            }
            return data;
        }
    }
}
export = FormSchema
