import { createSelector, For } from 'solid-js';
import BottlesGridBottle from '~/components/BottlesGridBottle';
import { useConfig } from '~/hooks/ConfigContext';
import { useGrids } from '~/hooks/GridsContext';

export default function TheBottlesGrid(): JSXElement {
	const [config, setConfig] = useConfig();
	const [grids, onGrids] = useGrids();
	const isSelected = createSelector(() => config.selected);


	return (
		<main class="flex-(~ wrap) justify-center gap-12 w-full p-4">
			<For
				each={grids}
				children={(fills, i) => (
					<BottlesGridBottle
						fills={fills}
						isSelected={isSelected(i())}
						onClick={() => {
							setConfig('selected', onGrids.select(i()));
						}}
					/>
				)}
			/>
		</main>
	);
}