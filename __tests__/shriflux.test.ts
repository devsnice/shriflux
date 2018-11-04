import { Store, Dispatcher, Types } from "../src/index";

describe("Shriflux - test dispatcher and store together", () => {
  it("should processing flow without errors", () => {
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
    const storeSubscriberSpy = jest.fn();
    userStore.subscribe(storeSubscriberSpy);

    // Register storeEffects
    appDispatcher.register(userStoreEffects);

    // Dispatch new action
    appDispatcher.dispatch({
      type: "USER_LOGIN",
      payload: {
        time: 0
      }
    });

    // Check, that store was updated
    expect(userStore.getData()).toEqual({
      ...initialData,
      login: true,
      loginTime: 0
    });

    // Check, that subscriber get updates
    expect(storeSubscriberSpy).toBeCalled();
  });
});
