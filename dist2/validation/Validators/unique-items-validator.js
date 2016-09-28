"use strict";
var _ = require('underscore');
/**
     * Return true if the array contains unique items (using strict equality), otherwise false.
     *
     *  @require underscore
     */
var UniqItemsValidator = (function () {
    function UniqItemsValidator() {
        this.tagName = 'uniqItems';
    }
    UniqItemsValidator.prototype.isAcceptable = function (s) {
        if (_.isArray(s)) {
            return _.uniq(s).length === s.length;
        }
        return false;
    };
    return UniqItemsValidator;
}());
exports.UniqItemsValidator = UniqItemsValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/unique-items-validator.js.map