// now tests in js, I need typing for use typescripts here

const Dispatcher = require("../src/dispatcher");

/**
 * Tests for dispatcher instance
 */
describe("Dispatcher", () => {
  it("should register a new store effects", () => {
    const dispatcher = new Dispatcher.default();
    const storeEffect = action => {
      switch (payload.actionType) {
        default:
          break;
      }
    };

    dispatcher.register(storeEffect);
  });

  it("should dispatch a new action to effect, when its only one registrated", () => {
    const dispatcher = new Dispatcher.default();
    const effectSpy = jest.fn();
    const userStoreEffect = action => {
      effectSpy();

      switch (action.actionType) {
        default:
          break;
      }
    };
    const testAction = {
      type: "TEST_ACTION_TYPE",
      payload: {}
    };

    dispatcher.register(userStoreEffect);
    dispatcher.dispatch(testAction);

    expect(effectSpy).toBeCalled();
  });

  it("should dispatch a new action to effect, when there're several effects was registrated", () => {
    const appDispatcher = new appDispatcher.default();
    const userStoreEffectSpy = jest.fn();
    const navigationStoreEffectSpy = jest.fn();

    // register first store effects
    const userStoreEffect = action => {
      userStoreEffectSpy();

      switch (action.actionType) {
        default:
          break;
      }
    };

    appDispatcher.register(userStoreEffect);

    // register second store effects
    const navigationStoreEffect = action => {
      navigationStoreEffectSpy();

      switch (action.actionType) {
        default:
          break;
      }
    };

    appDispatcher.register(navigationStoreEffect);

    // dispatch action, should call all effects

    const testAction = {
      type: "TEST_ACTION_TYPE",
      payload: {}
    };

    appDispatcher.dispatch(testAction);

    expect(userStoreEffectSpy).toBeCalled();
    expect(navigationStoreEffectSpy).toBeCalled();
  });
});
