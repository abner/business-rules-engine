import { IComponent } from './component.interface';
/*
   It represents utility for making composite object accessible by dot notation.
*/
export class CompositeDotObject {

  /*
  It transforms composite object to dot accessible composite object.
      */
  static Transform(component: IComponent, obj) {
    if (obj === undefined) obj = {};
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
  }
}
