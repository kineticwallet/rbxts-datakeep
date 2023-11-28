import Keep from "./Keep";

declare interface Wrapper {
	onDataChange<D>(self: Keep<D>, dataPath: string, callback: Callback): RBXScriptConnection | undefined;
	Mutate<D>(self: Keep<D>, dataPath: string, processor: Callback): void;
}

export declare const Wrapper: Wrapper;
