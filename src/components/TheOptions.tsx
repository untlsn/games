import { For } from 'solid-js';
import { produce } from 'solid-js/store';
import { useConfig } from '~/hooks/ConfigContext';
import { Dialog } from '@kobalte/core/dialog';

export default function TheOptions(): JSXElement {
	const [config, setConfig] = useConfig();

	return (
		<Dialog>
			<Dialog.Trigger>
				Opcje
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Content
					class="fixed inset-0 m-auto w-100 h-150 p-4 z-top text-white rounded bg-gradient-to-br from-([#2C1D33] 30%) to-[#2f205e]/70 border-(1 white/30)"
				>
					<h2>Kolory:</h2>
					<ul class="flex-(~ wrap) gap-4 ml-4">
						<For each={config.colors} children={(it, i) => (
							<li>
								<span>{i()+1}. </span>
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
						<p>Puste butelki:</p>
						<input
							type="number"
							class="border-1 rounded-md px-2 py-1 mt-2"
							value={config.empty}
							onChange={ev => {
								setConfig('empty', ev.currentTarget.valueAsNumber)
							}}
						/>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}