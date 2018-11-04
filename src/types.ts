export interface IAction {
  type: string;
  payload: {
    [key: string]: any;
  };
}

export type StoreEffect = (action: IAction) => void;
