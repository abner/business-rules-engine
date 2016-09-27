/*
  It represents signal (event).
*/
export interface ISignal<T> {
    add(listener: (parameter: T) => any, priority?: number): void;
    remove(listener: (parameter: T) => any): void;
    dispatch(parameter: T): boolean;
    clear(): void;
    hasListeners(): boolean;
}
