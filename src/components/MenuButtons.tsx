import type { GridsActions } from '~/hooks/createGrids';
import TheOptions from '~/components/TheOptions';

export default function MenuButtons(props: { onGrids: GridsActions }): JSXElement {
	return (
		<nav class="flex gap-4 mb-12 justify-center px-4 py-2 rounded border-(b white/10)">
			<button type="button" onClick={() => props.onGrids.undo()}>
				Cofnij
			</button>
			<button type="button" onClick={() => props.onGrids.restart()}>
				Reset
			</button>
			<button type="button" onClick={() => props.onGrids.recreate()}>
				Restart
			</button>
			<TheOptions recreate={props.onGrids.recreate} />
		</nav>
	);
}