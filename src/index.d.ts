import Keep from "./Keep";
import MockStore from "./MockStore";
import { Wrapper } from "./Wrapper";

declare type StoreInfo = {
	Name: string;
	Scope?: string;
};

declare type UnReleasedActions = {
	Ignore: string;
	Cancel: string;
};

declare type ActiveSession = {
	PlaceID: number;
	JobID: number;
};

declare type GlobalUpdate = {
	Data: unknown;
	Id: number;
};

declare type UnReleasedHandler = (activeSession: ActiveSession) => keyof UnReleasedActions;

declare type GlobalID = number;

declare interface GlobalUpdates {
	AddGlobalUpdate: <D extends object>(globalData: D) => Promise<GlobalID>;
	GetActiveUpdates: () => GlobalUpdate[];
	RemoveActiveUpdate: (updateId: GlobalID) => Promise<void>;
	ChangeActiveUpdate: <D extends object>(updateId: GlobalID, globalData: D) => Promise<void>;
}

declare type Store<D> = {
	Mock: MockStore;
	LoadKeep: (key: string, unReleasedHandler?: UnReleasedHandler) => Promise<Keep<D>>;
	ViewKeep: (key: string, version?: string) => Promise<Keep<D> | undefined>;
	AttachToSave: (
		compression: Record<string, ExtractMembers<D, D>>,
		decompression: Record<string, ExtractMembers<D, D>>,
	) => void;
	PostGlobalUpdate: (key: string, updateHandler: (globalUpdates: GlobalUpdates) => unknown) => Promise<void>;
};

declare interface DataKeep<D extends object>  {
	Wrapper: Wrapper<D>;
	GetStore(storeInfo: StoreInfo | string, dataTemplate: D): Promise<Store<D>>;
}

export = DataKeep;
