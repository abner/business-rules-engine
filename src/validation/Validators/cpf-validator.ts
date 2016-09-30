import * as Validation from '../Validation';
/**
 * @ngdoc object
 * @name CPFValidator
 *
 * @description
 * Return true for valid cpf, otherwise return false.
 *
 * @example
 *
 * <pre>
 *  //create validator
 *  let validator = new CPFValidator();
 *
 *  //valid CPF -> return true
 *  let result = validator.isAcceptable('42752206259');
 *  //unvalid IC  -> return false
 *  let result = validator.isAcceptable('11111111111');
 *
 * </pre>
 */
export class CPFValidator implements Validation.IPropertyValidator {

    /**
     * It checks validity of identification number of CZE company (called ico)
     * @param input {string} value to check
     * @returns {boolean} return true for valid value, otherwise false
     */
    public isAcceptable(input: string) {

        if (input === undefined) return false;

        if (input.length === 0 || input.length !== 11) return false;

        if (!/^\d+$/.test(input)) return false;

        if ([
              '00000000000', '11111111111', '22222222222', '33333333333',
              '44444444444', '55555555555', '66666666666', '77777777777',
              '88888888888', '99999999999'
            ].indexOf(input) > -1) {
          return false;
        }

        let Sci = [];
        let Souc;
        let Del = input.length;
        let kon = parseInt(input.substring(Del, Del - 1), 10); // CLng(Right(strInput, 1));
        // let Numer = parseInt(input.substring(0,Del - 1),10);
        Del = Del - 1;
        Souc = 0;
        for (let a = 0; a < Del; a++) {
            Sci[a] = parseInt(input.substr((Del - a) - 1, 1), 10);
            Sci[a] = Sci[a] * (a + 2);
            Souc = Souc + Sci[a];
        }

        if (Souc > 0) {
            // let resul = 11 - (Souc % 11);
            let resul = Souc % 11;
            let mezi = Souc - resul;
            resul = mezi + 11;
            resul = resul - Souc;

            if ((resul === 10 && kon === 0) || (resul === 11 && kon === 1) || (resul === kon))
                return true;
        }
        return false;
    }

    tagName = 'cpf';
}
