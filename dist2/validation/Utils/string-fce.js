"use strict";
/*
  It represents utility for string manipulation.
*/
var StringFce = (function () {
    function StringFce() {
    }
    StringFce.format = function (s, args) {
        var formatted = s;
        for (var prop in args) {
            if (prop) {
                var regexp = new RegExp('\\{' + prop + '\\}', 'gi');
                formatted = formatted.replace(regexp, args[prop]);
            }
        }
        return formatted;
    };
    return StringFce;
}());
exports.StringFce = StringFce;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Utils/string-fce.js.map