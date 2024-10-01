import { createSelector, createSignal, For } from 'solid-js';
import '~/assets/style';
import { produce } from 'solid-js/store';
import Bottle from '~/components/Bottle';
import createGrids from '~/hooks/createGrids';

export default function App() {
	const [colors, setColors] = createSignal<string[]>(['#FF0000', '#007F00', '#0000FF', '#FFA400', '#00FFFF', '#FFFF00']);
	const [emptyCount, setEmptyCount] = createSignal(2);

  const [grids, onGrids] = createGrids({
		get colors() { return colors() },
		get empty() { return emptyCount() },
	})
	const [selected, setSelected] = createSignal<number>();
	const isSelected = createSelector(selected);

  return (
    <main class="grid-(~ cols-1_2_1 rows-1_4) min-h-screen bg-[#121212] text-white">
			<div class="flex gap-4 col-span-full mx-auto">
				<button onClick={onGrids.restart}>
					Reset
				</button>
				<button onClick={onGrids.recreate}>
					Restart
				</button>
			</div>
			<div />
			<div class="grid-(~ cols-fit-20) gap-4 size-50vh mx-auto">
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
								onGrids.set(produce((draft) => {
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
			<div>
				<h2>Colors:</h2>
				<ul class="list-decimal">
					<For each={colors()} children={(it, i) => (
						<li>
							<input type="color" value={it} onChange={(ev) => {
								const newColors = [...colors()]
								newColors[i()] = ev.currentTarget.value
								setColors(newColors)
							}} />
							<button
								type="button"
								class="i-ph-x mb-2"
								onClick={() => {
									setColors(colors().toSpliced(i(), 1))
								}}
							>
								Remove
							</button>
						</li>
					)}/>
					<li class="list-none">
						<button type="button" onClick={() => {
							setColors([...colors(), '#ffffff'])
						}}>
							Add
						</button>
					</li>
				</ul>
				<div class="mt-4">
					<p>Empty bottles:</p>
					<input
						type="number"
						class="border-1 rounded-md px-2 py-1 mt-2"
						value={emptyCount()}
						onChange={ev => {
							setEmptyCount(ev.currentTarget.valueAsNumber)
						}}
					/>
				</div>
			</div>
		</main>
  );
}