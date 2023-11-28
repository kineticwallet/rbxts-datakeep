import Keep from "./Keep";

declare interface Wrapper<D> {
	onDataChange(self: Keep<D>, dataPath: string, callback: Callback): RBXScriptConnection | undefined;
	Mutate(self: Keep<D>, dataPath: string, processor: Callback): void;
}

export declare const Wrapper: Wrapper<unknown>;
