type SubscriptionId = string;

export default class Store {
  private data: object = {};
  private subscribers: Map<SubscriptionId, Function> = new Map();
  private amountSubscriptions = 0;

  constructor({ initialData }: { initialData: Object }) {
    this.data = initialData;
  }

  private _createSubscriptionId() {
    this.amountSubscriptions++;

    return `sub_${this.amountSubscriptions}`;
  }

  private _notifySubscribers() {
    this.subscribers.forEach((subscriberCallback: Function) => {
      subscriberCallback();
    });
  }

  public getData(): object {
    return this.data;
  }

  public updateData(updatedFieldsData: object): object {
    this.data = {
      ...this.data,
      ...updatedFieldsData
    };

    this._notifySubscribers();

    return this.data;
  }

  public subscribe(callback: Function): SubscriptionId {
    const subId: SubscriptionId = this._createSubscriptionId();

    this.subscribers.set(subId, callback);

    return subId;
  }

  public unsubscribe(id: SubscriptionId): boolean {
    return this.subscribers.delete(id);
  }
}
