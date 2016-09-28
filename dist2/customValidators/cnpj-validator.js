"use strict";
/**
 * @ngdoc object
 * @name CNPJValidator
 *
 * @description
 * Return true for valid cpf, otherwise return false.
 *
 * @example
 *
 * <pre>
 *  //create validator
 *  let validator = new CNPJValidator();
 *
 *  //valid CNPJ -> return true
 *  let result = validator.isAcceptable('00000000000191');
 *  //unvalid CNPJ  -> return false
 *  let result = validator.isAcceptable('00000000000192');
 *
 * </pre>
 */
var CNPJValidator = (function () {
    function CNPJValidator() {
        this.tagName = 'cnpj';
    }
    /**
     * It checks validity of identification number of CZE company (called ico)
     * @param input {string} value to check
     * @returns {boolean} return true for valid value, otherwise false
     */
    CNPJValidator.prototype.isAcceptable = function (input) {
        if (input === undefined)
            return false;
        if (input.length === 0 || input.length > 14)
            return false;
        if (!/^\d+$/.test(input))
            return false;
        if ([
            '00000000000000', '11111111111111', '22222222222222', '33333333333333',
            '44444444444444', '55555555555555', '66666666666666', '77777777777777',
            '88888888888888', '99999999999999'
        ].indexOf(input) > -1) {
            return false;
        }
        var Sci = [];
        var Souc;
        var Del = input.length;
        var kon = parseInt(input.substring(Del, Del - 1), 10); // CLng(Right(strInput, 1));
        // let Numer = parseInt(input.substring(0,Del - 1),10);
        Del = Del - 1;
        Souc = 0;
        for (var a = 0; a < Del; a++) {
            Sci[a] = parseInt(input.substr((Del - a) - 1, 1), 10);
            Sci[a] = Sci[a] * (a + 2);
            Souc = Souc + Sci[a];
        }
        if (Souc > 0) {
            // let resul = 11 - (Souc % 11);
            var resul = Souc % 11;
            var mezi = Souc - resul;
            resul = mezi + 11;
            resul = resul - Souc;
            if ((resul === 10 && kon === 0) || (resul === 11 && kon === 1) || (resul === kon))
                return true;
        }
        return false;
    };
    return CNPJValidator;
}());
exports.CNPJValidator = CNPJValidator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/customValidators/cnpj-validator.js.map