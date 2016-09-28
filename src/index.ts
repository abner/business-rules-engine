import  * as ValidationsModule from './validation/Validation';
import  * as ValidatorsModule from './validation/Validators';
import  * as FormSchemaModule from './validation/FormSchema';

export const FormSchema = FormSchemaModule;
export const Validators = ValidatorsModule;
export const Validation = ValidationsModule;

export const BusinessRulesEngine = {
  Validation: ValidationsModule,
  Validators: ValidatorsModule,
  FormSchema: FormSchemaModule
};
