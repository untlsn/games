import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { createContext, useContext } from 'solid-js';

export type Config = {
	colors: string[],
	empty: number,
	willHidden?: boolean,
	hidden?: boolean
	selected?: number,
}

type StoreTuple<T> = [get: Store<T>, set: SetStoreFunction<T>];

export function createConfig(): StoreTuple<Config> {
	return createStore<Config>({
		colors: ['#FF0000', '#007F00', '#0000FF', '#FFA400', '#00FFFF', '#FFFF00'],
		empty: 2,
		hidden: true
	})
}

const ConfigContext = createContext<StoreTuple<Config>>()

export function useConfig() {
	const res = useContext(ConfigContext);
	if (!res) throw new Error('ConfigContext Provider is not present in tree')
	return res;
}

export const ConfigProvider = ConfigContext.Provider;