var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("dispatcher", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            const { type, payload } = action;
            this.effects.forEach(effect => {
                effect(action);
            });
        }
    }
    exports.default = Dispatcher;
});
define("store", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = Store;
});
define("index", ["require", "exports", "dispatcher", "store", "types"], function (require, exports, dispatcher_1, store_1, Types) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    dispatcher_1 = __importDefault(dispatcher_1);
    store_1 = __importDefault(store_1);
    Types = __importStar(Types);
    exports.Dispatcher = dispatcher_1.default;
    exports.Store = store_1.default;
    exports.Types = Types;
});
