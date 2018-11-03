// now tests in js, I need typing for use typescripts here

import Dispatcher from "../src/dispatcher";
import { IAction } from "../src/types";

/**
 * Tests for dispatcher instance
 */
describe("Dispatcher", () => {
  it("should register a new store effects", () => {
    const dispatcher = new Dispatcher();
    const storeEffect = (action: IAction) => {
      switch (action.type) {
        default:
          break;
      }
    };

    dispatcher.register(storeEffect);
  });

  it("should dispatch a new action to effect, when its only one registrated", () => {
    const dispatcher = new Dispatcher();
    const effectSpy = jest.fn();
    const userStoreEffect = (action: IAction) => {
      effectSpy();

      switch (action.type) {
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
    const appDispatcher = new Dispatcher();
    const userStoreEffectSpy = jest.fn();
    const navigationStoreEffectSpy = jest.fn();

    // register first store effects
    const userStoreEffect = (action: IAction) => {
      userStoreEffectSpy();

      switch (action.type) {
        default:
          break;
      }
    };

    appDispatcher.register(userStoreEffect);

    // register second store effects
    const navigationStoreEffect = (action: IAction) => {
      navigationStoreEffectSpy();

      switch (action.type) {
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
