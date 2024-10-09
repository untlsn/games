import { createMemo, createSelector, For, Show } from 'solid-js';
import BottlesGridBottle from '~/components/BottlesGridBottle';
import { useConfig } from '~/hooks/ConfigContext';
import { useGrids } from '~/hooks/GridsContext';

export default function TheBottlesGrid(): JSXElement {
	const [config, setConfig] = useConfig();
	const [grids, onGrids] = useGrids();
	const isSelected = createSelector(() => config.selected);

	const success = createMemo(() => {
		return grids.every((it) => {
			return !it.length || it.length == 4 && !!it.reduce((acc, cur) => acc == cur ? acc : '');
		});
	});

	return (
		<main class="flex-(~ wrap) justify-center gap-12 w-full p-4 relative">
			<Show when={success()}>
				<div class="absolute inset-0 size-full grid place-items-center text-xl">
					<p>Sukces</p>
				</div>
			</Show>
			<For
				each={grids}
				children={(fills, i) => (
					<BottlesGridBottle
						fills={fills}
						isSelected={isSelected(i())}
						isSuccess={success()}
						onClick={() => {
							setConfig('selected', onGrids.select(i()));
						}}
					/>
				)}
			/>
		</main>
	);
}