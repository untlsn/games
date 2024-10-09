import { For } from 'solid-js';
import { createStore, produce, unwrap } from 'solid-js/store';
import { useConfig } from '~/hooks/ConfigContext';
import { Dialog } from '@kobalte/core/dialog';
import { NumberField } from '@kobalte/core/number-field';
import { Checkbox } from '@kobalte/core/checkbox';

function jsonCopy<T>(value: T): T {
	return JSON.parse(
		JSON.stringify(
			value,
		),
	);
}

export default function TheOptions(props: { recreate: () => void }): JSXElement {
	const [config, setConfig] = useConfig();
	const [values, setValues] = createStore(jsonCopy(unwrap(config)));

	const submit = () => {
		setConfig(values);
		props.recreate();
	};

	return (
		<Dialog>
			<Dialog.Trigger>
				Opcje
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Content
					class="fixed inset-0 m-auto w-100 h-150 p-4 z-top text-white rounded bg-gradient-to-br from-([#2C1D33] 30%) to-[#2f205e]/70 border-(1 white/30) flex-(~ col)"
				>
					<div class="flex justify-between text-xl mb-4">
						<h2>Ustawienia</h2>
						<Dialog.CloseButton class="i-ph-x" />
					</div>
					<h3 class="mb-2">Kolory:</h3>
					<ul class="flex-(~ wrap) gap-4 ml-4">
						<For
							each={values.colors}
							children={(it, i) => (
								<li>
									<span>{i() + 1}. </span>
									<input
										type="color"
										value={it}
										onChange={(ev) => {
											setValues('colors', produce((draft) => {
												draft[i()] = ev.currentTarget.value;
											}));
										}}
									/>
									<button
										type="button"
										class="i-ph-x mb-2"
										onClick={() => {
											setValues('colors', (it) => it.toSpliced(i(), 1));
										}}
									>
										Remove
									</button>
								</li>
							)}
						/>
						<li class="list-none">
							<button
								type="button"
								onClick={() => {
									setValues('colors', produce((draft) => {
										draft.push('#ffffff');
									}));
								}}
							>
								Add
							</button>
						</li>
					</ul>
					<NumberField
						class="mt-4"
						onChange={(value) => setValues('empty', +value)}
					>
						<NumberField.Label class="mb-2 block">Puste butelki:</NumberField.Label>
						<NumberField.Input
							type="number"
							class="border-1 rounded-md px-2 py-1 mt-2"
							value={values.empty}
						/>
					</NumberField>
					<Checkbox defaultChecked={values.hidden} onChange={(it) => setValues('hidden', it)} class="mt-4 flex gap-2 items-center">
						<Checkbox.Label>Ukrywaj elementy: </Checkbox.Label>
						<Checkbox.Input />
						<Checkbox.Control class="i-ph-square data-[checked]:i-ph-check-square text-6" />
					</Checkbox>
					<div class="mt-auto flex justify-evenly">
						<Dialog.CloseButton
							type="button"
							class="border-(~ y-white/50 x-white/10) px-4 py-2 rounded hocus:bg-white/20 transition-colors"
							onClick={submit}
						>
							Potwierdź ustawienia
						</Dialog.CloseButton>
						<Dialog.CloseButton type="button" class="border-(~ y-white/50 x-white/10) px-4 py-2 rounded hocus:bg-white/20 transition-colors">
							Anuluj
						</Dialog.CloseButton>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}