"use strict";
/**
 * It defines compare operators.
*/
(function (CompareOperator) {
    /**
     * must be less than
     */
    CompareOperator[CompareOperator["LessThan"] = 0] = "LessThan";
    /**
     * cannot be more than
     */
    CompareOperator[CompareOperator["LessThanEqual"] = 1] = "LessThanEqual";
    /**
     *  must be the same as
     */
    CompareOperator[CompareOperator["Equal"] = 2] = "Equal";
    /**
     * must be different from
     */
    CompareOperator[CompareOperator["NotEqual"] = 3] = "NotEqual";
    /**
     * cannot be less than
     */
    CompareOperator[CompareOperator["GreaterThanEqual"] = 4] = "GreaterThanEqual";
    /**
     * must be more than
     */
    CompareOperator[CompareOperator["GreaterThan"] = 5] = "GreaterThan";
})(exports.CompareOperator || (exports.CompareOperator = {}));
var CompareOperator = exports.CompareOperator;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Validation/enums.js.map