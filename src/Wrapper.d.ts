declare interface Wrapper {
    onDataChange(self: unknown, dataPath: string, callback: Callback): RBXScriptConnection | undefined
    Mutate(self: unknown, dataPath: string, processor: Callback): void
}

export declare const Wrapper: Wrapper
