import { IValidationResult, IOptional, IErrorTranslateArgs } from './interfaces';
import { PropertyValidationRule } from './property-validation-rule';
import  * as Utils  from '../Utils';
import * as _ from 'underscore';


/**
 *
 * @ngdoc object
 * @name  ValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents simple abstract error object.
 */
export class ValidationResult implements IValidationResult {

  public IsDirty: boolean;

  constructor(public Name: string) { }

  public get Children(): Array<IValidationResult> {
    return [];
  }

  public Add(error: IValidationResult) {
    throw ('Cannot add to ValidationResult to leaf node.');
  }
  public Remove(index: number) {
    throw ('Cannot remove ValidationResult from leaf node.');
  }
  public ErrorsChanged: Utils.ISignal<any> = new Utils.Signal();

  public DispatchErrorsChanged() {
    if (this.ErrorsChanged !== undefined) this.ErrorsChanged.dispatch(this);
  }

  public Optional: IOptional;
  public TranslateArgs: Array<IErrorTranslateArgs>;

  public get HasErrorsDirty(): boolean {
    return this.IsDirty && this.HasErrors;
  }

  public get HasErrors(): boolean {
    return false;
  }

  public get ErrorCount(): number {
    return 0;
  }
  public get ErrorMessage(): string {
    return "";
  }

  add(child: Utils.IComponent): boolean { this.add(child); return true; }
  remove(child: Utils.IComponent): boolean { this.remove(child); return true; }
  getChildren(): Utils.IComponent[] { return this.Children; }
  getName(): string { return this.Name }
  isItem(): boolean { return true; }

}

/**
 *
 * @ngdoc object
 * @name  CompositeValidationResult
 * @module Validation
 *
 *
 * @description
 * It represents composite error object.
 */
export class CompositeValidationResult implements IValidationResult {

  public Children: Array<IValidationResult> = [];

  constructor(public Name: string) {
  }

  public Optional: IOptional;

  public ErrorsChanged: Utils.ISignal<any> = new Utils.Signal();

  public AddFirst(error: IValidationResult) {
    this.Children.unshift(error);
  }
  public Add(error: IValidationResult) {
    this.Children.push(error);
  }
  public Remove(index: number) {
    this.Children.splice(index, 1);
  }
  public Clear() {
    this.Children.splice(0, this.Children.length);
  }

  public get HasErrorsDirty(): boolean {
    if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional()) return false;
    return _.some(this.Children, function (error) {
      return error.HasErrorsDirty;
    });
  }

  get HasErrors(): boolean {
    if (this.Optional !== undefined && _.isFunction(this.Optional) && this.Optional()) return false;
    return _.some(this.Children, function (error) {
      return error.HasErrors;
    });
  }
  public get ErrorCount(): number {
    if (!this.HasErrors) return 0;
    return _.reduce(this.Children, function (memo, error: IValidationResult) {
      return memo + error.ErrorCount;
    }, 0);

    //return _.filter(this.children, function (error) { return error.HasErrors; }).length;
  }
  public get ErrorMessage(): string {
    if (!this.HasErrors) return "";
    return _.reduce(this.Children, function (memo, error: IValidationResult) {
      return memo + error.ErrorMessage;
    }, "");
  }

  public get TranslateArgs(): Array<IErrorTranslateArgs> {
    if (!this.HasErrors) return [];
    var newArgs = [];
    _.each(this.Children, function (error: IValidationResult) {
      newArgs = newArgs.concat(error.TranslateArgs);
    });
    return newArgs;
  }

  public LogErrors(headerMessage?: string) {
    if (headerMessage === undefined) headerMessage = "Output";
    console.log("---------------\n");
    console.log("--- " + headerMessage + " ----\n");
    console.log("---------------\n");
    this.traverse(this, 1);
    console.log("\n\n\n");
  }

  public get Errors(): { [name: string]: IValidationResult } {
    var map: { [name: string]: IValidationResult } = {};
    _.each(this.Children, function (val) {
      map[val.Name] = val;
    });
    return map;
  }
  private get FlattenErros(): Array<IValidationResult> {
    var errors = [];
    this.flattenErrors(this, errors);
    return errors;
  }
  public SetDirty() {
    this.SetDirtyEx(this, true);
  }
  public SetPristine() {
    this.SetDirtyEx(this, false);
  }
  private SetDirtyEx(node: IValidationResult, dirty: boolean) {
    if (node.Children.length === 0) {
      node["IsDirty"] = dirty;
    }
    else {
      for (var i = 0, len = node.Children.length; i < len; i++) {
        //stop if there are no children with errors
        this.SetDirtyEx(node.Children[i], dirty);
      }
    }
  }
  private flattenErrors(node: IValidationResult, errorCollection: Array<IValidationResult>) {
    if (node.Children.length === 0) {
      if (node.HasErrors) errorCollection.push(node);
    }
    else {
      for (var i = 0, len = node.Children.length; i < len; i++) {
        //stop if there are no children with errors
        if (node.Children[i].HasErrors)
          this.flattenErrors(node.Children[i], errorCollection);
      }
    }
  }

  // recursively traverse a (sub)tree
  private traverse(node: IValidationResult, indent: number) {

    console.log(Array(indent++).join("--") + node.Name + " (" + node.ErrorMessage + ")" + '\n\r');

    for (var i = 0, len = node.Children.length; i < len; i++) {
      this.traverse(node.Children[i], indent);
    }

  }

  add(child: Utils.IComponent): boolean { this.add(child); return true; }
  remove(child: Utils.IComponent): boolean { this.remove(child); return true; }
  getChildren(): Utils.IComponent[] { return this.Children; }
  getName(): string { return this.Name }
  isItem(): boolean { return false; }
}

/**
 * It represents mixed validation rule for composite error object and property validation rule error.
 */
class MixedValidationResult extends CompositeValidationResult implements IValidationResult {

  constructor(private Composite: IValidationResult, private PropRule: PropertyValidationRule<any>) {
    super(Composite.Name);


  }

  public get Children() { return this.Composite.Children; }
  public get ValidationFailures() { return this.PropRule.ValidationFailures; }

  public get HasErrorsDirty(): boolean {
    if (this.Composite.HasErrorsDirty) return true;
    if (this.PropRule !== undefined && this.PropRule.HasErrorsDirty) return true;
    return false;
  }

  get HasErrors(): boolean {
    if (this.Composite.HasErrors) return true;
    if (this.PropRule !== undefined && this.PropRule.HasErrors) return true;
    return false;
  }
  public get ErrorCount(): number {
    if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors) return 0;
    return this.Composite.ErrorCount + (this.PropRule !== undefined ? this.PropRule.ErrorCount : 0);
  }
  public get ErrorMessage(): string {
    if (!this.Composite.HasErrors && this.PropRule !== undefined && !this.PropRule.HasErrors) return "";
    this.Composite.ErrorMessage + this.PropRule !== undefined ? this.PropRule.ErrorMessage : "";
  }
}
