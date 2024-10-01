import { For } from 'solid-js';
import { produce } from 'solid-js/store';
import { useConfig } from '~/hooks/ConfigContext';

export default function TheOptions(): JSXElement {
	const [config, setConfig] = useConfig();

	return (
		<nav>
			<h2>Colors:</h2>
			<ul class="list-decimal">
				<For each={config.colors} children={(it, i) => (
					<li>
						<input type="color" value={it} onChange={(ev) => {
							setConfig('colors', produce(draft => {
								draft[i()] = ev.currentTarget.value;
							}))
						}}/>
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
		</nav>
	);
}