"use strict";
/*
    It represents utility for number manipulation.
*/
var NumberFce = (function () {
    function NumberFce() {
    }
    NumberFce.GetNegDigits = function (value) {
        if (value === undefined) {
            return 0;
        }
        ;
        var digits = value.toString().split('.');
        if (digits.length > 1) {
            var negDigitsLength = digits[1].length;
            return negDigitsLength;
        }
        return 0;
    };
    return NumberFce;
}());
exports.NumberFce = NumberFce;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Utils/number-fce.js.map