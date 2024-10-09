import { unwrap } from 'solid-js/store';

export default function copyStore<T>(store: T): T {
	return JSON.parse(JSON.stringify(unwrap(store)));
}