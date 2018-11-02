import { IAction } from "./types";

type StoreEffects = Function;

/**
 * The dispatcher is the central hub
 * that manages all data flow in a Flux application.
 */
export default class Dispatcher {
  private appStoreEffects: Array<StoreEffects> = [];

  /**
   * Register storeEffects inside
   * @param storeEffects
   */
  public register(storeEffects: Function) {
    this.appStoreEffects.push(storeEffects);
  }

  /**
   * Dispatch a new action to all registered stores
   * @param action
   */
  public dispatch(action: IAction) {
    const { type, payload } = action;

    this.appStoreEffects.forEach(effect => {
      effect(action);
    });
  }
}
