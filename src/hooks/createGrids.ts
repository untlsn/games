import { createStore, produce, reconcile, SetStoreFunction } from 'solid-js/store';
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

export type GridsActions = {
	restart: () => void,
	recreate: () => void,
	set: SetStoreFunction<string[][]>,
	select: (index: number) => number | undefined
}


export default function createGrids(config: Config): [string[][], GridsActions] {
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
			select: (i) => {
				const fills = grids[i];
				if (config.selected == undefined) {
					return fills.length ? i : undefined;
				}
				if (config.selected == i) {
					return undefined;
				}
				console.log(fills.length, fills[0], grids[config.selected!][0]);
				if (!fills.length || fills.length < 4 && fills[0] == grids[config.selected!][0]) {
					setGrids(produce((draft) => {
						const selectedArr = draft[config.selected!];
						const curArr = draft[i!];
						const color = selectedArr.shift()!;
						while (selectedArr[0] == color && curArr.length < 3) {
							console.log(selectedArr[0]);
							curArr.unshift(selectedArr.shift()!);
						}
						curArr.unshift(color);
					}))
				}
				return undefined;
			}
		}
	]
}