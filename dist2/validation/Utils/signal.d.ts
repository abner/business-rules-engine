import { ISignal } from './signal.interface';
export declare class Signal<T> implements ISignal<T> {
    private listeners;
    private priorities;
    add(listener: (parameter: T) => any, priority?: number): void;
    remove(listener: (parameter: T) => any): void;
    dispatch(parameter: T): boolean;
    clear(): void;
    hasListeners(): boolean;
}
