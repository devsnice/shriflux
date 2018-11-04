type SubscriptionId = string;
type SubscriberCallback = () => void;

interface IStore {
  getData: () => void;
  updateData: (updatedFieldsData: object) => object;
  subscribe: (callback: SubscriberCallback) => SubscriptionId;
  unsubscribe: (id: SubscriptionId) => boolean;
}

interface IStoreData {
  [key: string]: any;
}

export default class Store implements IStore {
  private data: IStoreData = {};
  private subscribers: Map<SubscriptionId, SubscriberCallback> = new Map();
  private amountSubscriptions = 0;

  constructor({ initialData }: { initialData: IStoreData }) {
    this.data = initialData;
  }

  private _createSubscriptionId() {
    this.amountSubscriptions++;

    return `sub_${this.amountSubscriptions}`;
  }

  private _notifySubscribers() {
    this.subscribers.forEach((subscriberCallback: SubscriberCallback) => {
      subscriberCallback();
    });
  }

  public getData(): IStoreData {
    return this.data;
  }

  public updateData(updatedFieldsData: object): IStoreData {
    this.data = {
      ...this.data,
      ...updatedFieldsData
    };

    this._notifySubscribers();

    return this.data;
  }

  public subscribe(callback: SubscriberCallback): SubscriptionId {
    const subId: SubscriptionId = this._createSubscriptionId();

    this.subscribers.set(subId, callback);

    return subId;
  }

  public unsubscribe(id: SubscriptionId): boolean {
    return this.subscribers.delete(id);
  }
}
