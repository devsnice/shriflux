import { IAction } from "./types";
declare type StoreEffect = (action: IAction) => void;
/**
 * The dispatcher is the central hub
 * that manages all data flow in a Flux application.
 */
export default class Dispatcher {
    private effects;
    /**
     * Register storeEffect inside
     * @param storeEffect
     */
    register(storeEffect: StoreEffect): void;
    /**
     * Dispatch a new action to all registered stores
     * @param action
     */
    dispatch(action: IAction): void;
}
export {};
