import type { SetStoreFunction, Store } from 'solid-js/store';
import { createStore } from 'solid-js/store';
import type { FlowProps } from 'solid-js';
import { createContext, createEffect, on, useContext } from 'solid-js';

export type Config = {
	colors:    string[],
	empty:     number,
	hidden?:   boolean
	selected?: number,
};

type StoreTuple<T> = [get: Store<T>, set: SetStoreFunction<T>];

export const defaultConfig: Readonly<Config> = {
	colors: ['#FF0000', '#007F00', '#0000FF', '#FFA400', '#00FFFF', '#FFFF00'],
	empty:  2,
	hidden: false,
};

const bottlesConfigKey = 'bottles::config';

function getInitialStorage(): Config {
	try {
		const storageConfig = localStorage.getItem(bottlesConfigKey);
		return storageConfig ? JSON.parse(storageConfig) : { ...defaultConfig };
	} catch {
		return { ...defaultConfig };
	}
}

function createConfig(): StoreTuple<Config> {


	const [config, setConfig] = createStore<Config>(getInitialStorage());

	createEffect(on(
		() => ({ ...config }),
		(it) => {
			localStorage.setItem(bottlesConfigKey, JSON.stringify(it));
		},
		{ defer: true },
	));

	return [config, setConfig];
}

const ConfigContext = createContext<StoreTuple<Config>>();

export function useConfig(): StoreTuple<Config> {
	const res = useContext(ConfigContext);
	if (!res) throw new Error('ConfigContext Provider is not present in tree');
	return res;
}

export function TheConfigProvider(props: FlowProps): JSXElement {
	return (
		<ConfigContext.Provider value={createConfig()}>
			{props.children}
		</ConfigContext.Provider>
	);
}