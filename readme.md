## Shriflux - Simple flux implementation

## Flux

```
view -> action -> dispatcher -> store
 ^  < - - - - - - - - - - - - - - - -
```

## How to run development mode

```
npm i
npm start
```

## How to make build

```
npm run build
```

## How to test

```
npm test
```

## API

### Effect

It's abstract thing, that describes how a store should effects on a new action in Dispatcher.

### Dispatcher

The dispatcher is the central hub that manages all data flow in a Flux application.
It holds all effects, that we have in application and calls them, when got a new action.

```
// create dispatcher for your application for getting start
const appDispatcher = new Dispatcher();
```

**Dispatcher.register(storeEffect: StoreEffect)**

Register storeEffect inside

**Dispatcher.dispatch(action: IAction)**

Dispatch a new action to all registered storeEffects

### Store

Store holds data and notifies subscribers, when data inside was changed.

```
// Create store for user data
const initialData = {
  name: "Shriflux",
  description: "one another flux implementation"
};
const userStore = new Store({
  initialData
});
```

**Store.getData: () => IStoreData**

returns current store data

**Store.updateData: (updatedFieldsData: object) => IStoreData**

update store's data fields and notifies subscribers, that something in store was changed

**Store.subscribe: (callback: SubscriberCallback) => SubscriptionId**

subscribe callback and new changes inside store

**Store.unsubscribe: (id: SubscriptionId) => boolean**
unsubscribe callback from changes of store

## Example of flow

```
// Create application dispatcher
const appDispatcher = new Dispatcher();

// Create store for user data
const initialData = {
  name: "Shriflux",
  description: "one another flux implementation"
};
const userStore = new Store({
  initialData
});

// Create userStoreEffects for processing dispatcher actions
const userStoreEffects = (action: Types.IAction): void => {
  switch (action.type) {
    case "USER_LOGIN":
      userStore.updateData({
        login: true,
        loginTime: action.payload.time
      });
      break;

    default:
      break;
  }
};

// Subscribe on store updates
const storeSubscriber = () => {};
userStore.subscribe(storeSubscriber);

// Register storeEffects
appDispatcher.register(userStoreEffects);

// Dispatch new action
appDispatcher.dispatch({
  type: "USER_LOGIN",
  payload: {
    time: 0
  }
});
```
