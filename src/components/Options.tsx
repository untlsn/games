import { For } from 'solid-js';
import { produce, SetStoreFunction } from 'solid-js/store';
import { Config } from '~/hooks/ConfigContext';

export default function Options(props: { config: Config, setConfig: SetStoreFunction<Config> }): JSXElement {
	return (
		<nav>
			<h2>Colors:</h2>
			<ul class="list-decimal">
				<For each={props.config.colors} children={(it, i) => (
					<li>
						<input type="color" value={it} onChange={(ev) => {
							props.setConfig('colors', produce(draft => {
								draft[i()] = ev.currentTarget.value;
							}))
						}}/>
						<button
							type="button"
							class="i-ph-x mb-2"
							onClick={() => {
								props.setConfig('colors', it => it.toSpliced(i(), 1))
							}}
						>
							Remove
						</button>
					</li>
				)}/>
				<li class="list-none">
					<button type="button" onClick={() => {
						props.setConfig('colors', produce(draft => {
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
					value={props.config.empty}
					onChange={ev => {
						props.setConfig('empty', ev.currentTarget.valueAsNumber)
					}}
				/>
			</div>
		</nav>
	);
}