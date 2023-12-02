import FastSignal from "@rbxts/fastsignal";

declare type ActiveSession = {
	PlaceID: number;
	JobID: number;
};

type MetaData = {
	ActiveSession: ActiveSession | undefined;
	ForceLoad: ActiveSession | undefined;
	LastUpdate: number;
	Created: number;
	LoadCount: number;
};

declare type GlobalUpdate = {
	Data: unknown;
	Id: number;
};

declare type GlobalUpdates = {
	ID: number;
	Updates: Record<number, GlobalUpdate>;
};

declare type Version = string;

declare interface Iterator {
	Current: () => Version | undefined;
	Next: () => Version | undefined;
	Previous: () => Version | undefined;
	PageUp: () => void;
	PageDown: () => void;
	SkipEnd: () => void;
	SkipStart: () => void;
}

declare interface KeepStruct<D> {
	Data: D;
	MetaData: MetaData;
	GlobalUpdates: GlobalUpdates;
	UserIds: number[];
}

declare interface Keep<D> extends KeepStruct<D> {
	OnGlobalUpdate: FastSignal<unknown>;
	GlobalStateProcessor: (updateData: GlobalUpdate, lock: () => boolean, remove: () => boolean) => void;
	OnRelease: FastSignal<void>;
	Save(): KeepStruct<D>;
	IsActive(): boolean;
	Identify(): boolean;
	GetKeyInfo(): DataStoreKeyInfo;
	Release(): Promise<Keep<D>>;
	Reconcile(): void;
	AddUserId(userId: number): void | undefined;
	RemoveUserId(userId: number): void;
	GetVersions(minDate?: number, maxDate?: number): Promise<Iterator>;
	SetVersion(version: string, migrateProcessor?: (versionKeep: Keep<D>) => Keep<D>): Promise<Keep<D>>;
	GetActiveGlobalUpdates(): GlobalUpdate[];
	GetLockedGlobalUpdates(): GlobalUpdate[];
	ClearLockedUpdate(id: number): Promise<void>;
}

declare const Keep: Keep<unknown>;

export = Keep;
