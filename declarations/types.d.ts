export interface IAction {
    type: string;
    payload: {
        [key: string]: any;
    };
}
export declare type StoreEffect = (action: IAction) => void;
