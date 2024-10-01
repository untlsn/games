import { createStore, reconcile } from 'solid-js/store';
import { Config } from '~/hooks/ConfigContext';

function deepClone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}

function createGrid(config: Config): string[][] {
	const availableColors = config.colors.flatMap(it => Array(4).fill(it) as string[]);

	return [
		...config.colors.map(() => {
			return Array.from({ length: 4 }, () => {
				return availableColors.splice(Math.floor(Math.random() * availableColors.length), 1)[0]
			})
		}),
		...deepClone(Array(config.empty).fill([])),
	]
}

export default function createGrids(config: Config) {
	let gridSnap = createGrid(config);

	const [grids, setGrids] = createStore(deepClone(gridSnap))

	const restart = () => setGrids(reconcile(gridSnap))


	return [
		grids,
		{
			restart,
			recreate: () => {
				gridSnap = createGrid(config);
				restart();
			},
			set: setGrids,
		}
	] as const
}