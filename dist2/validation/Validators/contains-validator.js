"use strict";
var Q = require('q');
var _ = require('underscore');
/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 * Predefined values are fetched async with options service.
 *
 * @require underscore
 * @require Q
 */
var ContainsValidator = (function () {
    /**
     * Default constructor.
     * @param Options - async service that returns array of values.
     *
     *
     */
    function ContainsValidator(Options) {
        this.Options = Options;
        this.isAsync = true;
        this.tagName = 'contains';
        if (Options === undefined)
            this.Options = Q.when([]);
    }
    ContainsValidator.prototype.isAcceptable = function (s) {
        var deferred = Q.defer();
        this.Options.then(function (result) {
            var hasSome = _.some(result, function (item) {
                return item === s;
            });
            if (hasSome)
                deferred.resolve(true);
            deferred.resolve(false);
        });
        return deferred.promise;
    };
    return ContainsValidator;
}());
exports.ContainsValidator = ContainsValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/contains-validator.js.map