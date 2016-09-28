export declare class Util {
    static TYPE_KEY: string;
    static PROPERTIES_KEY: string;
    static DEFAULT_KEY: string;
    static ARRAY_KEY: string;
    /**
     * Returns the initial JSON data structured according to JSON schema.
     * The data are initilizied with default values.
     */
    static InitValues(formSchema: any, dataParam?: any): any;
}
