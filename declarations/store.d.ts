declare type SubscriptionId = string;
declare type SubscriberCallback = () => void;
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
    constructor({ initialData }: {
        initialData: Object;
    });
    private _createSubscriptionId;
    private _notifySubscribers;
    getData(): object;
    updateData(updatedFieldsData: object): object;
    subscribe(callback: SubscriberCallback): SubscriptionId;
    unsubscribe(id: SubscriptionId): boolean;
}
export {};
