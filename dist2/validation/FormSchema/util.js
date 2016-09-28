"use strict";
var _ = require('underscore');
var Util = (function () {
    function Util() {
    }
    /**
     * Returns the initial JSON data structured according to JSON schema.
     * The data are initilizied with default values.
     */
    Util.InitValues = function (formSchema, dataParam) {
        var data = dataParam || {};
        for (var key in formSchema) {
            var item = formSchema[key];
            var type = item[Util.TYPE_KEY];
            if (type === 'object') {
                data[key] = {};
                Util.InitValues(item[Util.PROPERTIES_KEY], data[key]);
            }
            else if (type === 'array') {
                data[key] = [];
            }
            else {
                var defaultValue = item[Util.DEFAULT_KEY];
                if (defaultValue === undefined)
                    continue;
                // Type casting
                if (type === 'boolean') {
                    if (defaultValue === '0') {
                        defaultValue = false;
                    }
                    else {
                        defaultValue = !!defaultValue;
                    }
                }
                if ((type === 'number') ||
                    (type === 'integer')) {
                    if (_.isString(defaultValue)) {
                        if (!defaultValue.length) {
                            defaultValue = null;
                        }
                        else if (!isNaN(Number(defaultValue))) {
                            defaultValue = Number(defaultValue);
                        }
                    }
                }
                if ((type === 'string') &&
                    (defaultValue === '')) {
                    defaultValue = null;
                }
                // TODO: default value
                data[key] = defaultValue;
            }
        }
        return data;
    };
    Util.TYPE_KEY = 'type';
    Util.PROPERTIES_KEY = 'properties';
    Util.DEFAULT_KEY = 'default';
    Util.ARRAY_KEY = 'items';
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/FormSchema/util.js.map