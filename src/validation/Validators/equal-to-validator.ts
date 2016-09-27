import { IPropertyValidator } from './../Validation/interfaces';
/**
     * Return true if a value is equal (using strict equal) to passed value, otherwise false.
     */
    export class EqualToValidator implements IPropertyValidator {

        tagName = 'equalTo';
        /**
         *
         * @param Value
         */
        constructor(public Value?:any) {

        }
        isAcceptable(s:any) {
            return s === this.Value;
        }

    }
