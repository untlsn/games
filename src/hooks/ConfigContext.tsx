import { SetStoreFunction, Store } from 'solid-js/store';

export type Config = {
	colors: string[],
	empty: number,
	// willHidden?: boolean,
	// hidden?: boolean
	// selected?: number,
}

type StoreTuple<T> = [get: Store<T>, set: SetStoreFunction<T>];