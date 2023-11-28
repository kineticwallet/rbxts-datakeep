import FastSignal from "@rbxts/fastsignal"

declare type ActiveSession = {
    PlaceID: number,
    JobID: number
}

type MetaData = {
    ActiveSession: ActiveSession | undefined,
    ForceLoad: ActiveSession | undefined,
    LastUpdate: number,
    Created: number,
    LoadCount: number
}

declare type GlobalUpdate = {
    Data: unknown,
    Id: number
}

declare type GlobalUpdates = {
    ID: number,
    Updates: Record<number, GlobalUpdate>
}

declare type Version = string

declare interface Iterator {
    Current: () => Version | undefined,
    Next: () => Version | undefined,
    Previous: () => Version | undefined
    PageUp: () => void
    PageDown: () => void
    SkipEnd: () => void
    SkipStart: () => void
}

declare interface KeepStruct {
    Data: undefined,
    MetaData: MetaData,
    GlobalUpdates: GlobalUpdates,
    UserIds: number[]
}

declare interface Keep {
    OnGlobalUpdate: FastSignal,
    GlobalStateProcessor: (update : unknown, lock: () => boolean, remove: () => boolean) => void
    OnRelease: FastSignal
    Save: () => KeepStruct
    IsActive: () => boolean
    Identify: () => boolean
    GetKeyInfo: () => DataStoreKeyInfo
    Release: () => Promise<Keep>
    Reconcile: () => void
    AddUserId: (userId: number) => void | undefined
    RemoveUserId: (userId: number) => void
    GetVersions: (minDate?: number, maxDate?: number) => Promise<Iterator>
    SetVersion: (version: string, migrateProcessor?: (versionKeep: Keep) => Keep) => Promise<Keep>
    GetActiveGlobalUpdates: () => GlobalUpdate[]
    GetLockedGlobalUpdates: () => GlobalUpdate[]
    ClearLockedUpdate: (id: number) => Promise<void>
}

declare const Keep: Keep

export = Keep
