import * as ValidationsModule from './validation/Validation';
import * as ValidatorsModule from './validation/Validators';
import * as FormSchemaModule from './validation/FormSchema';
export declare const FormSchema: typeof FormSchemaModule;
export declare const Validators: typeof ValidatorsModule;
export declare const Validation: typeof ValidationsModule;
export declare const BusinessRulesEngine: {
    Validation: typeof ValidationsModule;
    Validators: typeof ValidatorsModule;
    FormSchema: typeof FormSchemaModule;
};
