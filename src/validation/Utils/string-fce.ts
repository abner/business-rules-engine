/*
  It represents utility for string manipulation.
*/
export class StringFce {
  static format(s: string, args: any): string {
    let formatted = s;
    for (let prop in args) {
      if (prop) {
        let regexp = new RegExp('\\{' + prop + '\\}', 'gi');
        formatted = formatted.replace(regexp, args[prop]);
      }
    }
    return formatted;
  }
}
