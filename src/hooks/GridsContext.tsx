import type { SetStoreFunction } from 'solid-js/store';
import { createStore, produce, reconcile } from 'solid-js/store';
import type { Config } from '~/hooks/ConfigContext';
import { useConfig } from '~/hooks/ConfigContext';
import copyStore from '~/utils/copyStore';
import { createContext, useContext } from 'solid-js';

function createGrid(config: Config): string[][] {
	const availableColors = config.colors.flatMap((it) => Array(4).fill(it) as string[]);

	return [
		...config.colors.map(() => {
			return Array.from({ length: 4 }, () => {
				return availableColors.splice(Math.floor(Math.random() * availableColors.length), 1)[0];
			});
		}),
		...copyStore(Array(config.empty).fill([])),
	];
}

export type Grids = string[][];
export type GridsActions = {
	restart:  () => void,
	recreate: () => void,
	undo:     () => void
	set:      SetStoreFunction<Grids>,
	select:   (index: number) => number | undefined
};


function createGrids(): [Grids, GridsActions] {
	const [config] = useConfig();
	let gridSnap = createGrid(config);
	const gridUndos = [gridSnap];

	const [grids, setGrids] = createStore(copyStore(gridSnap));

	const restart = () => setGrids(reconcile(gridSnap));


	return [
		grids,
		{
			restart,
			recreate: () => {
				gridSnap = createGrid(config);
				restart();
			},
			set:  setGrids,
			undo: () => {
				const last = gridUndos.pop();
				if (!last) return;
				setGrids(last);
			},
			select: (i) => {
				const fills = grids[i];
				if (config.selected == undefined) {
					return fills.length ? i : undefined;
				}
				if (config.selected == i) {
					return undefined;
				}
				if (!fills.length || fills.length < 4 && fills[0] == grids[config.selected!].at(config.tap ? -1 : 0)) {
					gridUndos.push(copyStore(grids));
					setGrids(produce((draft) => {
						const selectedArr = draft[config.selected!];
						const curArr = draft[i!];
						const color = config.tap ? selectedArr.pop()! : selectedArr.shift()!;
						while (selectedArr.at(config.tap ? -1 : 0) == color && curArr.length < 3) {
							curArr.unshift(config.tap ? selectedArr.pop()! : selectedArr.shift()!);
						}
						curArr.unshift(color);
					}));
				}
				return undefined;
			},
		},
	];
}

const GridsContext = createContext<[Grids, GridsActions]>();

export function TheGridsProvider(props: { children: JSXElement }): JSXElement {
	return (
		<GridsContext.Provider value={createGrids()}>
			{props.children}
		</GridsContext.Provider>
	);
}

export function useGrids(): [Grids, GridsActions] {
	const context = useContext(GridsContext);
	if (!context) throw new Error('GridsContext Provider is not present in tree');

	return context;
}