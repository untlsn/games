import { createSelector, createSignal, For } from 'solid-js';
import '~/assets/style';
import { produce } from 'solid-js/store';
import Bottle from '~/components/Bottle';
import createGrids from '~/hooks/createGrids';
import { createConfig } from '~/hooks/ConfigContext';

export default function App() {
	const [config, setConfig] = createConfig();

  const [grids, onGrids] = createGrids(config)
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
					<For each={config.colors} children={(it, i) => (
						<li>
							<input type="color" value={it} onChange={(ev) => {
								setConfig('colors', produce(draft => {
									draft[i()] = ev.currentTarget.value;
								}))
							}} />
							<button
								type="button"
								class="i-ph-x mb-2"
								onClick={() => {
									setConfig('colors', it => it.toSpliced(i(), 1))
								}}
							>
								Remove
							</button>
						</li>
					)}/>
					<li class="list-none">
						<button type="button" onClick={() => {
							setConfig('colors', produce(draft => {
								draft.push('#ffffff');
							}))
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
						value={config.empty}
						onChange={ev => {
							setConfig('empty', ev.currentTarget.valueAsNumber)
						}}
					/>
				</div>
			</div>
		</main>
  );
}