import { createStore, SetStoreFunction, Store } from 'solid-js/store';

export type Config = {
	colors: string[],
	empty: number,
	// willHidden?: boolean,
	// hidden?: boolean
	selected?: number,
}

type StoreTuple<T> = [get: Store<T>, set: SetStoreFunction<T>];

export function createConfig(): StoreTuple<Config> {
	return createStore({
		colors: ['#FF0000', '#007F00', '#0000FF', '#FFA400', '#00FFFF', '#FFFF00'],
		empty: 2,
	})
}