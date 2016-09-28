"use strict";
/**
  * Return true if it is a valid zip code, otherwise false.
  */
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
        this.numberRegexp = /^[0-9]+$/;
        this.tagName = 'zipcode';
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && this.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validators/zip-code-validator.js.map