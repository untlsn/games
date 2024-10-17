import { createStore, produce } from 'solid-js/store';
import type { MineActions, MineStore, StoreWithActions } from '~/hooks/createMineStore.types';
import { countBy, createPool, getValidSibling, showEmptyRec } from '~/hooks/createMineStore.utils';


export default function createMineStore(width: number): StoreWithActions<MineStore, MineActions> {
	const [mineStore, setMineStore] = createStore<MineStore>({
		pool: createPool(width),
		width,
	});


	return [mineStore, {
		poolClick(index) {
			setMineStore(produce((draft) => {
				const { pool } = draft;
				const current = pool[index];
				if (!current) return;

				if (!draft.flagMode) {
					if (!showEmptyRec(draft, index) && current.value != 'x') current.show = true;
					return;
				}

				if (!current.show) {
					current.flag = !current.flag;
					return;
				}

				const poolCount = +(current.value || '_');
				if (isNaN(poolCount)) return;

				const sibling = getValidSibling(index, draft.width);
				const flagSiblings = countBy(sibling, (poolIndex) => !!pool[poolIndex]?.flag);
				if (flagSiblings != poolCount) return;

				sibling.forEach((it) => showEmptyRec(draft, it));
			}));
		},
		flagChange(newValue) {
			setMineStore('flagMode', newValue);
		},
		set: setMineStore,
	}];
}