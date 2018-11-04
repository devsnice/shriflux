'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * The dispatcher is the central hub
 * that manages all data flow in a Flux application.
 */
class Dispatcher {
    constructor() {
        this.effects = [];
    }
    /**
     * Register storeEffect inside
     * @param storeEffect
     */
    register(storeEffect) {
        this.effects.push(storeEffect);
    }
    /**
     * Dispatch a new action to all registered stores
     * @param action
     */
    dispatch(action) {
        this.effects.forEach(effect => {
            effect(action);
        });
    }
}

class Store {
    constructor({ initialData }) {
        this.data = {};
        this.subscribers = new Map();
        this.amountSubscriptions = 0;
        this.data = initialData;
    }
    _createSubscriptionId() {
        this.amountSubscriptions++;
        return `sub_${this.amountSubscriptions}`;
    }
    _notifySubscribers() {
        this.subscribers.forEach((subscriberCallback) => {
            subscriberCallback();
        });
    }
    getData() {
        return this.data;
    }
    updateData(updatedFieldsData) {
        this.data = Object.assign({}, this.data, updatedFieldsData);
        this._notifySubscribers();
        return this.data;
    }
    subscribe(callback) {
        const subId = this._createSubscriptionId();
        this.subscribers.set(subId, callback);
        return subId;
    }
    unsubscribe(id) {
        return this.subscribers.delete(id);
    }
}



var types = /*#__PURE__*/Object.freeze({

});

exports.Dispatcher = Dispatcher;
exports.Store = Store;
exports.Types = types;
