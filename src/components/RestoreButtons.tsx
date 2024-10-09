import { GridsActions } from '~/hooks/createGrids';
import TheOptions from '~/components/TheOptions';

export default function RestoreButtons(props: { onGrids: GridsActions }): JSXElement {
	return (
		<nav class="flex gap-4 mb-12 justify-center px-4 py-2 rounded border-(b white/10)">
			<button onClick={props.onGrids.restart}>
				Reset
			</button>
			<button onClick={props.onGrids.recreate}>
				Restart
			</button>
			<TheOptions />
		</nav>
	);
}