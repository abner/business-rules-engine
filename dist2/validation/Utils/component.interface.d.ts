export interface IComponent {
    add(child: IComponent): boolean;
    remove(child: IComponent): boolean;
    getChildren(): IComponent[];
    getName(): string;
    isItem(): boolean;
}
