"use strict";
var Q = require('q');
var axios = require('axios');
var _ = require('underscore');
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
var RemoteValidator = (function () {
    /**
     * Default constructor
     * @param Options - remote service url + options
     */
    function RemoteValidator(Options) {
        this.Options = Options;
        this.tagName = 'remote';
        this.isAsync = true;
        this.axios = axios;
    }
    RemoteValidator.prototype.isAcceptable = function (s) {
        var deferred = Q.defer();
        this.axios.post(this.Options.url, {
            method: this.Options.type || 'get',
            data: _.extend({} || this.Options.data, {
                'value': s
            })
        }).then(function (response) {
            var isAcceptable = response === true || response === 'true';
            deferred.resolve(isAcceptable);
        })
            .catch(function (response) {
            deferred.resolve(false);
            console.log(response);
        });
        return deferred.promise;
    };
    return RemoteValidator;
}());
exports.RemoteValidator = RemoteValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/remote-validator.js.map