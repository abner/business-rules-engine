import { IStringValidator } from './../Validation/interfaces';
import { MinimalDefaultValue } from './min-length-validator';
import { MaximalDefaultValue } from './max-length-validator';
/**
    * Return true if string length is between MinLength and MaxLength property.
    */
export class RangeLengthValidator implements IStringValidator {

  tagName = 'rangelength';

  /**
   * Default constructor.
   * @param RangeLength - array [minimal number of characters, maximal number of characters]
   */
  constructor(public RangeLength?: Array<number>) {
    if (RangeLength === undefined) {
      this.RangeLength = [MinimalDefaultValue, MaximalDefaultValue];
    }
  }

  isAcceptable(s: string) {
    return s.length >= this.MinLength && s.length <= this.MaxLength;
  }

  public get MinLength(): number {
    return this.RangeLength[0];
  }

  public get MaxLength(): number {
    return this.RangeLength[1];
  }

}
