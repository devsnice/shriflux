import Store from "../src/store";

describe("Store module", () => {
  it("should create a new store with defined initialData", () => {
    const initialData = {
      name: "Test",
      surname: "Tester",
      birth: "12.10.1000",
      friends: [0, 123, 23, 22],
      actions: [{ type: "login" }]
    };

    const userStore = new Store({
      initialData
    });

    expect(userStore.getData()).toEqual(initialData);
  });

  it("should correct update data, when a new portion passed in updateData method", () => {
    const initialData = {
      name: "Test"
    };
    const userStore = new Store({
      initialData
    });
    const updatedFields = {
      friends: [0, 12, 43],
      tracking: [{ action: "login" }, { action: "routeTo" }]
    };

    const storeData = userStore.updateData(updatedFields);

    expect(storeData).toEqual({ ...initialData, ...updatedFields });
  });

  it("should subscribe a new callback on updates", () => {
    const userStore = new Store({
      initialData: {}
    });
    const subscribeSpy = jest.fn();

    userStore.subscribe(subscribeSpy);
    userStore.updateData({ newField: "test" });

    expect(subscribeSpy).toBeCalledTimes(1);
  });

  it("should notify all callbacks about updates", () => {
    const userStore = new Store({
      initialData: {}
    });
    const subscribeSpy1 = jest.fn();
    const subscribeSpy2 = jest.fn();

    userStore.subscribe(subscribeSpy1);
    userStore.subscribe(subscribeSpy2);
    userStore.updateData({ newField: "test" });

    expect(subscribeSpy1).toBeCalledTimes(1);
    expect(subscribeSpy2).toBeCalledTimes(1);
  });

  it("should unsubscribe callback from updates", () => {
    const userStore = new Store({
      initialData: {}
    });
    const subscribeSpy = jest.fn();
    const subId = userStore.subscribe(subscribeSpy);

    userStore.updateData({ newField: "test" });
    userStore.unsubscribe(subId);
    userStore.updateData({ testField: true });

    expect(subscribeSpy).toBeCalledTimes(1);
  });
});
