import Keep from "./Keep";
import MockStore from "./MockStore";
import { Wrapper } from "./Wrapper";

declare type StoreInfo = {
    Name: string,
    Scope?: string
}

declare type UnReleasedActions = {
    Ignore: string,
    Cancel: string
}

declare type ActiveSession = {
    PlaceID: number,
    JobID: number
}

declare type UnReleasedHandler = (activeSession: ActiveSession) => keyof UnReleasedActions

declare type Store = {
    Mock: MockStore,
    LoadKeep: (key: string, unReleasedHandler?: UnReleasedHandler) => Promise<Keep>
    ViewKeep: (key: string, version?: string) => Promise<Keep | undefined>
    AttachToSave: (compression: Callback, decompression: Callback) => void
    PostGlobalUpdate: (key: string, updateHandler: () => unknown) => Promise<void>
}

declare interface DataKeep {
    Wrapper: Wrapper
    GetStore(storeInfo: StoreInfo | string, dataTemplate: unknown): Promise<Store>
}

declare const DataKeep: DataKeep;

export = DataKeep;
