/**
 * It defines compare operators.
*/
export enum CompareOperator {
  /**
   * must be less than
   */
  LessThan,
  /**
   * cannot be more than
   */
  LessThanEqual,
  /**
   *  must be the same as
   */
  Equal,

  /**
   * must be different from
   */
  NotEqual,

  /**
   * cannot be less than
   */
  GreaterThanEqual,

  /**
   * must be more than
   */
  GreaterThan
}
