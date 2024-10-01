import { GridsActions } from '~/hooks/createGrids';

export default function RestoreButtons(props: { onGrids: GridsActions }): JSXElement {
	return (
		<nav class="flex gap-4 col-span-full mx-auto">
			<button onClick={props.onGrids.restart}>
				Reset
			</button>
			<button onClick={props.onGrids.recreate}>
				Restart
			</button>
		</nav>
	);
}