import * as _ from 'underscore';

export class Util {

  static TYPE_KEY = 'type';
  static PROPERTIES_KEY = 'properties';
  static DEFAULT_KEY = 'default';
  static ARRAY_KEY = 'items';

  /**
   * Returns the initial JSON data structured according to JSON schema.
   * The data are initilizied with default values.
   */
  static InitValues(formSchema: any, dataParam?: any) {

    let data = dataParam || {};

    for (let key in formSchema) {
      let item = formSchema[key];
      let type = item[Util.TYPE_KEY];
      if (type === 'object') {
        data[key] = {};
        Util.InitValues(item[Util.PROPERTIES_KEY], data[key]);
      }
      else if (type === 'array') {
        data[key] = [];
      }
      else {
        let defaultValue = item[Util.DEFAULT_KEY];
        if (defaultValue === undefined) continue;

        // Type casting
        if (type === 'boolean') {
          if (defaultValue === '0') {
            defaultValue = false;
          } else {
            defaultValue = !!defaultValue;
          }
        }
        if ((type === 'number') ||
          (type === 'integer')) {
          if (_.isString(defaultValue)) {
            if (!defaultValue.length) {
              defaultValue = null;
            } else if (!isNaN(Number(defaultValue))) {
              defaultValue = Number(defaultValue);
            }
          }
        }
        if ((type === 'string') &&
          (defaultValue === '')) {
          defaultValue = null;
        }

        // TODO: default value
        data[key] = defaultValue;

      }
    }
    return data;
  }
}
