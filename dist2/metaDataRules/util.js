var Validation;
(function (Validation) {
    /**
     * YUIDoc_comment
     *
     * @class util
     * @constructor
     **/
    var Util = (function () {
        function Util() {
            this.CLASS_NAME = 'util';
        }
        Util.generateData = function (metaData) {
            var data = {};
            Util.generateDataEx(metaData, data);
            return data;
        };
        //TODO: find better way how to distinguish between data fields items and meta data information
        //TODO: better documentation
        Util.generateDataEx = function (o, data, parentPath) {
            //TODO: better implementation - like _.defaults()
            var metaDataKeys = ["label", "rules", "help", "id", "defaultValue", "options", "unit", "hint", "Common", "disclaimer", "saveOptions", "optionsRef", "apiId"];
            var tableKey = "RowData";
            var containsLeafFce = function (key) { return _.contains(this, key); };
            var containsTableFce = function (key) { return key == this; };
            for (var key in o) {
                if (_.contains(metaDataKeys, key))
                    continue;
                var item = o[key];
                if (_.isArray(item)) {
                    data[key] = item;
                    continue;
                }
                if (typeof (item) == "object") {
                    var isLeafNode = _.every(_.keys(item), containsLeafFce, metaDataKeys);
                    if (isLeafNode) {
                        data[key] = undefined;
                        continue;
                    }
                    var isTableNode = _.some(_.keys(item), containsTableFce, tableKey);
                    if (isTableNode) {
                        data[key] = [];
                        continue;
                    }
                    data[key] = {};
                    var path = parentPath === undefined ? key : parentPath + "." + key;
                    //going on step down in the object tree!!
                    this.generateDataEx(o[key], data[key], path);
                }
            }
        };
        Util.RULE_PROPERTY_NAME = "rules";
        Util.LABEL_PROPERTY_NAME = "label";
        return Util;
    }());
    Validation.Util = Util;
})(Validation || (Validation = {}));
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/metaDataRules/util.js.map