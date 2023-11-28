declare interface MockStorePages {
	GetCurrentPage: () => unknown;
	AdvanceToNextPageAsync: () => void;
}

declare function MockStorePages(
	unparsedData: unknown,
	isAscending: boolean,
	pageSize: number,
): LuaMetatable<
	{
		_data: unknown;
		_currentPage: number;
		_pageSize: number;
		IsFinished: boolean;
	} & MockStorePages
>;

declare interface MockStore {
	GetAsync: (key: string) => unknown;
	SetAsync: (key: string, value: unknown) => void;
	UpdateAsync: (key: string, callback: Callback) => unknown;
	ListVersionsAsync: (
		key: string,
		sortDirection: Enum.SortDirection,
		minDate: number,
		maxDate: number,
		limit: number,
	) => MockStorePages;
	GetVersionAsync: (key: string, version: string) => unknown | undefined;
}

declare const MockStore: MockStore;

export = MockStore;
