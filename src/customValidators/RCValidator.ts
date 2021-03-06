import * as moment from 'moment';
import * as _s from 'underscore';
import * as Validation from '../validation/Validation';
/**
 * @ngdoc object
 * @name RCValidator
 *
 * @requires moment
 * @requires underscore.string
 *
 * @description
 * Return true for valid birth day number in Czech Republic, otherwise return false.
 *
 * @example
 *
 * <pre>
 *
 *  //create validator
 *  let validator = new RCValidator();
 *
 *  //valid RC -> return true
 *  let result = validator.isAcceptable('800101/9999');
 *  //unvalid RC  -> return false
 *  let result = validator.isAcceptable('111111/1752');
 *
 * </pre>
 */
class RCValidator implements Validation.IPropertyValidator {

  public tagName: string = 'rc';

  public isAcceptable(s: any): boolean {

    let old: boolean = false;
    let month: number;
    let year: number;
    let day: number;
    let numrc: any;
    let dbg = false;
    if (s === undefined) return false;
    if (s.toString().length === 0) {
      return false;
    }

    if (!s.match(/^\d{6}\/?\d{3,4}$/)) return false;

    if (s.indexOf('/') != -1)
      old = s.length === 10;
    else
      old = s.length === 9;

    if (s.indexOf('/') !== -1) {
      numrc = s.split('/');
      numrc = numrc.join('');
    } else {
      numrc = s
    }

    day = parseInt(numrc.substring(4, 6), 10);
    month = parseInt(numrc.substring(2, 4), 10);
    year = parseInt(numrc.substring(0, 2), 10);

    if (s.match(/\/?(0000?|8888?|9999?)$/)) {
      dbg = true;
    }

    if (!old && !dbg) {
      if (numrc % 11 !== 0 && s.substr(s.length - 1) === '0') {
        if (parseInt(numrc.substr(0, 9), 10) % 11 !== 10) return false;
      }
      else if (numrc % 11 !== 0) return false;
    }

    if (year > 54 && old && !dbg) return false;

    if (!old && year < 54) year = 2000 + year;
    else year = 1900 + year;

    if (month > 50 && month < 63) month = month - 50;
    if (!old && year >= 2004) {  // vyjimka na pricitani dvojek k mesici
      if (month > 20 && month < 33) month = month - 20;
      if (month > 70 && month < 83) month = month - 70;
    }

    let datum = moment(_s.lpad(day.toString(), 2, '0') + '.' + _s.lpad(month.toString(), 2, '0') + '.' + year, 'DD.MM.YYYY');

    if (!datum.isValid()) return false;
    return datum.toDate() <= moment(Date.now()).toDate();

  }
}

export = RCValidator;
