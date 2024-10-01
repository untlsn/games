import { createSelector, For } from 'solid-js';
import BottlesGridBottle from '~/components/BottlesGridBottle';
import { Config } from '~/hooks/ConfigContext';

export default function BottlesGrid(props: {
	grids: string[][],
	config: Config,
	onSelect: (index: number) => void
}): JSXElement {
	const isSelected = createSelector(() => props.config.selected);


	return (
		<main class="grid-(~ cols-fit-20) gap-4 size-50vh mx-auto">
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