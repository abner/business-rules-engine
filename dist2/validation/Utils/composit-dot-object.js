"use strict";
/*
   It represents utility for making composite object accessible by dot notation.
*/
var CompositeDotObject = (function () {
    function CompositeDotObject() {
    }
    /*
    It transforms composite object to dot accessible composite object.
        */
    CompositeDotObject.Transform = function (component, obj) {
        if (obj === undefined)
            obj = {};
        if (component.isItem()) {
            obj[component.getName()] = component;
        }
        else {
            var children = component.getChildren();
            var parent = obj[component.getName()] = component;
            for (var comp in children) {
                CompositeDotObject.Transform(children[comp], parent);
            }
        }
        return obj;
    };
    return CompositeDotObject;
}());
exports.CompositeDotObject = CompositeDotObject;
//# sourceMappingURL=/home/80129498572/git/serpro/perdcomp-web/frontend/external/business-rules-engine/src/validation/Utils/composit-dot-object.js.map