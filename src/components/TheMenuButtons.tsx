import { useGrids } from '~/hooks/createGrids';
import TheOptions from '~/components/TheOptions';

export default function TheMenuButtons(): JSXElement {
	const [,onGrids] = useGrids();

	return (
		<nav class="flex gap-4 mb-12 justify-center px-4 py-2 rounded border-(b white/10)">
			<button type="button" onClick={onGrids.undo}>
				Cofnij
			</button>
			<button type="button" onClick={onGrids.restart}>
				Reset
			</button>
			<button type="button" onClick={onGrids.recreate}>
				Restart
			</button>
			<TheOptions recreate={onGrids.recreate} />
		</nav>
	);
}