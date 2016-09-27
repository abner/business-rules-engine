 /*
    It is component element from composite design pattern.
*/
export interface IComponent{
    add(child:IComponent):boolean;
    remove(child:IComponent):boolean;
    getChildren():IComponent[];
    getName():string;
    isItem():boolean;
}
