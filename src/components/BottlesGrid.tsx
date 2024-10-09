import { createSelector, For } from 'solid-js';
import BottlesGridBottle from '~/components/BottlesGridBottle';
import { useConfig } from '~/hooks/ConfigContext';

export default function BottlesGrid(props: {
	grids: string[][],
	onSelect: (index: number) => void
}): JSXElement {
	const [config] = useConfig();
	const isSelected = createSelector(() => config.selected);


	return (
		<main class="flex-(~ wrap) justify-center gap-12 w-full p-4">
			<For each={props.grids} children={(fills, i) => (
				<BottlesGridBottle
					fills={fills}
					isSelected={isSelected(i())}
					onClick={() => props.onSelect(i())}
				/>
			)}/>
		</main>
	);
}