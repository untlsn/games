import { unwrap } from 'solid-js/store';

export default function copyStore<T>(store: T): T {
	return JSON.parse(JSON.stringify(unwrap(store)));
}

export function stringifyStore(store: unknown): string {
	return JSON.stringify(unwrap(store));
}