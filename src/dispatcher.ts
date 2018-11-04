import { IAction, StoreEffect } from "./types";

/**
 * The dispatcher is the central hub
 * that manages all data flow in a Flux application.
 */
export default class Dispatcher {
  private effects: Array<StoreEffect> = [];

  /**
   * Register storeEffect inside
   * @param storeEffect
   */
  public register(storeEffect: StoreEffect) {
    this.effects.push(storeEffect);
  }

  /**
   * Dispatch a new action to all registered stores
   * @param action
   */
  public dispatch(action: IAction) {
    const { type, payload } = action;

    this.effects.forEach(effect => {
      effect(action);
    });
  }
}
