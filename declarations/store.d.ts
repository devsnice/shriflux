declare type SubscriptionId = string;
declare type SubscriberCallback = () => void;
interface IStore {
    getData: () => void;
    updateData: (updatedFieldsData: object) => object;
    subscribe: (callback: SubscriberCallback) => SubscriptionId;
    unsubscribe: (id: SubscriptionId) => boolean;
}
interface IStoreData {
    [index: string]: any;
}
export default class Store implements IStore {
    private data;
    private subscribers;
    private amountSubscriptions;
    constructor({ initialData }: {
        initialData: IStoreData;
    });
    private _createSubscriptionId;
    private _notifySubscribers;
    getData(): IStoreData;
    updateData(updatedFieldsData: object): IStoreData;
    subscribe(callback: SubscriberCallback): SubscriptionId;
    unsubscribe(id: SubscriptionId): boolean;
}
export {};
