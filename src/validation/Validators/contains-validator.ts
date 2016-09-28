import * as Q from 'q';
import * as _ from 'underscore';
import { IAsyncPropertyValidator } from './../Validation/interfaces';

/**
 * Return true if an value is any of predefined values (using strict equality), otherwise false.
 * Predefined values are fetched async with options service.
 *
 * @require underscore
 * @require Q
 */
export class ContainsValidator implements IAsyncPropertyValidator {

  isAsync = true;
  tagName = 'contains';

  /**
   * Default constructor.
   * @param Options - async service that returns array of values.
   *
   *
   */
  constructor(public Options: Q.Promise<Array<any>>) {
    if (Options === undefined) this.Options = Q.when([]);
  }

  isAcceptable(s: string): Q.Promise<boolean> {
    let deferred: Q.Deferred<boolean> = Q.defer<boolean>();

    this.Options.then(function (result) {
      let hasSome = _.some(result, function (item) {
        return item === s;
      });
      if (hasSome) deferred.resolve(true);
      deferred.resolve(false);
    });

    return deferred.promise;
  }

}
