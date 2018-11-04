declare module "types" {
  export interface IAction {
    type: string;
    payload: {
      [key: string]: any;
    };
  }
}
declare module "dispatcher" {
  import { IAction } from "types";
  type StoreEffect = (action: IAction) => void;
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
}
declare module "store" {
  type SubscriptionId = string;
  type SubscriberCallback = () => void;
  interface IStore {
    getData: () => void;
    updateData: (updatedFieldsData: object) => object;
    subscribe: (callback: SubscriberCallback) => SubscriptionId;
    unsubscribe: (id: SubscriptionId) => boolean;
  }
  export default class Store implements IStore {
    private data;
    private subscribers;
    private amountSubscriptions;
    constructor({ initialData }: { initialData: Object });
    private _createSubscriptionId;
    private _notifySubscribers;
    getData(): object;
    updateData(updatedFieldsData: object): object;
    subscribe(callback: SubscriberCallback): SubscriptionId;
    unsubscribe(id: SubscriptionId): boolean;
  }
}
declare module "index" {
  import Dispatcher from "dispatcher";
  import Store from "store";
  import * as Types from "types";
  export { Dispatcher, Store, Types };
}
