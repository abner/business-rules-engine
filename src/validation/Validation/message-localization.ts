
import { StringFce } from './../Utils/string-fce';
import * as _ from 'underscore';

export class MessageLocalization {

  static customMsg = 'Please, fix the field.';

  static defaultMessages = {
    'required': 'This field is required.',
    'remote': 'Please fix the field.',
    'email': 'Please enter a valid email address.',
    'url': 'Please enter a valid URL.',
    'date': 'Please enter a valid date.',
    'dateISO': 'Please enter a valid date ( ISO ).',
    'number': 'Please enter a valid number.',
    'digits': 'Please enter only digits.',
    'signedDigits': 'Please enter only signed digits.',
    'creditcard': 'Please enter a valid credit card number.',
    'equalTo': 'Please enter the same value again.',
    'maxlength': 'Please enter no more than {MaxLength} characters.',
    'minlength': 'Please enter at least {MinLength} characters.',
    'rangelength': 'Please enter a value between {MinLength} and {MaxLength} characters long.',
    'range': 'Please enter a value between {Min} and {Max}.',
    'max': 'Please enter a value less than or equal to {Max}.',
    'min': 'Please enter a value greater than or equal to {Min}.',
    'step': 'Please enter a value with step {Step}.',
    'contains': 'Please enter a value from list of values. Attempted value \'{AttemptedValue}\'.',
    'mask': 'Please enter a value corresponding with {Mask}.',
    minItems: 'Please enter at least {Min} items.',
    maxItems: 'Please enter no more than {Max} items.',
    uniqItems: 'Please enter unique items.',
    enum: 'Please enter a value from list of permitted values.',
    type: 'Please enter a value of type \'{Type}\'.',
    multipleOf: 'Please enter a value that is multiple of {Divider}.',
    'custom': MessageLocalization.customMsg
  };


  static ValidationMessages = MessageLocalization.defaultMessages;

  static GetValidationMessage(validator: any) {
    let msgText = MessageLocalization.ValidationMessages[validator.tagName];
    if (msgText === undefined || msgText === '' || !_.isString(msgText)) {
      msgText = MessageLocalization.customMsg;
    }

    return StringFce.format(msgText, validator);
  }
}