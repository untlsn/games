import { createSelector, createSignal, For } from 'solid-js';
import '~/assets/style';
import clsx from 'clsx';
import { createStore, produce, reconcile } from 'solid-js/store';

const colors = ['red', 'green', 'blue', 'orange', 'cyan', 'yellow'];

function deepClone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}

function createGrid() {
	const availableColors = colors.flatMap(it => Array(4).fill(it) as string[])
	const pickColor = () => {
		return availableColors.splice(Math.floor(Math.random() * availableColors.length), 1)[0]
	}

	return [
		[pickColor(), pickColor(), pickColor(), pickColor()],
		[pickColor(), pickColor(), pickColor(), pickColor()],
		[pickColor(), pickColor(), pickColor(), pickColor()],
		[pickColor(), pickColor(), pickColor(), pickColor()],
		[pickColor(), pickColor(), pickColor(), pickColor()],
		[pickColor(), pickColor(), pickColor(), pickColor()],
		[],
		[],
	]
}

export default function App() {
	const initialGrid = createGrid();

  const [grids, setGrids] = createStore(deepClone(initialGrid))
	const [selected, setSelected] = createSignal<number>();
	const isSelected = createSelector(selected);

  return (
    <main class="grid place-items-center min-h-screen bg-[#121212] text-white">
			<div class="flex gap-4">
				<button onClick={() => setGrids(reconcile(deepClone(initialGrid)))}>
					Reset
				</button>
				<button onClick={() => setGrids(reconcile(createGrid()))}>
					Restart
				</button>
			</div>
			<div class="grid-(~ cols-4) size-50vh">
				<For each={grids} children={(fills, i) => (
					<Bottle
						fills={fills}
						isSelected={isSelected(i())}
						onClick={() => {
							if (selected() == undefined) {
								if (fills.length) setSelected(i());
								return;
							}
							if (selected() == i()) {
								setSelected(undefined);
								return;
							}
							console.log(fills.length, fills[0], grids[selected()!][0]);
							if (!fills.length || fills.length < 4 && fills[0] == grids[selected()!][0]) {
								setGrids(produce((draft) => {
									const selectedArr = draft[selected()!];
									const curArr = draft[i()!];
									const color = selectedArr.shift()!;
									while (selectedArr[0] == color && curArr.length < 3) {
										console.log(selectedArr[0]);
										curArr.unshift(selectedArr.shift()!);
									}
									curArr.unshift(color);
								}))
							}
							setSelected(undefined);
						}}
					/>
				)} />
			</div>
    </main>
  );
}

function Bottle(props: { fills: string[], onClick: () => void, isSelected: boolean }): JSXElement {
	return (
		<div
			class={clsx(
				"h-40 w-10 border-2 border-t-0 rounded-b-full grid-(~ rows-4) gap-1 p-2px transition-transform last:children:rounded-b-full",
				props.isSelected && '-translate-y-12',
				props.fills.length && 'cursor-pointer',
			)}
			onClick={props.onClick}
		>
			<For each={Array(4 - props.fills.length)} children={() => <div />} />
			<For each={props.fills} children={(color) => (
				<div
					style={{ 'background-color': color }}
				/>
			)}/>
		</div>
	);
}
