import * as Q from 'q';
import * as axios from 'axios';
import * as _ from 'underscore';

import { IRemoteOptions, IAsyncPropertyValidator } from './../Validation/interfaces';
/**
 * Return true if remote service returns true, otherwise false.
 *
 * @require underscore
 * @require Q
 * @require axios
 *
 * @example
 * ```typescript
 *  url: 'http://test/validateEmail',
 *  ```
 */
export class RemoteValidator implements IAsyncPropertyValidator {

  tagName = 'remote';
  private axios: any;

  /**
   * Default constructor
   * @param Options - remote service url + options
   */
  constructor(public Options?: IRemoteOptions) {

    this.axios = axios;
  }

  isAcceptable(s: any): Q.Promise<boolean> {
    let deferred: Q.Deferred<boolean> = Q.defer<boolean>();

    this.axios.post(this.Options.url,
      {
        method: this.Options.type || 'get',
        data: _.extend({} || this.Options.data, {
          'value': s
        })
      }
    ).then(function (response) {
      let isAcceptable = response === true || response === 'true';
      deferred.resolve(isAcceptable);
    })
      .catch(function (response) {
        deferred.resolve(false);
        console.log(response);
      });

    return deferred.promise;
  }
  isAsync = true;
}
