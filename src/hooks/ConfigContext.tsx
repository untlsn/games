import type { SetStoreFunction, Store } from 'solid-js/store';
import { createStore } from 'solid-js/store';
import type { FlowProps } from 'solid-js';
import { createContext, useContext } from 'solid-js';

export type Config = {
	colors:    string[],
	empty:     number,
	hidden?:   boolean
	selected?: number,
};

type StoreTuple<T> = [get: Store<T>, set: SetStoreFunction<T>];

function createConfig(): StoreTuple<Config> {
	// eslint-disable-next-line solid/reactivity
	return createStore<Config>({
		colors: ['#FF0000', '#007F00', '#0000FF', '#FFA400', '#00FFFF', '#FFFF00'],
		empty:  2,
		hidden: false,
	});
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