import type { SetStoreFunction, Store } from 'solid-js/store';

export type MineStore = {
	pool:      PoolPoint[],
	width:     number,
	flagMode?: boolean,
};

export type StoreWithActions<T, TActions> = [get: Store<T>, actions: TActions & { set: SetStoreFunction<T> }];

export type PoolPoint = {
	value: string,
	show?: boolean,
	flag?: boolean,
};

export type MineActions = {
	poolClick:  (index: number) => void
	flagChange: (newValue: boolean) => void
};