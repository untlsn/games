import { createSignal, For, Show } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { defaultConfig, useConfig } from '~/hooks/ConfigContext';
import { Dialog } from '@kobalte/core/dialog';
import { NumberField } from '@kobalte/core/number-field';
import { Checkbox } from '@kobalte/core/checkbox';
import copyStore from '~/utils/copyStore';
import { useGrids } from '~/hooks/GridsContext';

export default function TheOptions(): JSXElement {
	const [config, setConfig] = useConfig();
	const [,onGrids] = useGrids();
	const [values, setValues] = createStore(copyStore(config));
	const [open, setOpen] = createSignal(false);
	const [error, setError] = createSignal('');

	const submit = () => {
		if (values.colors.length == new Set(values.colors).size) {
			setConfig({
				...values,
				hidden: !values.tap && values.hidden,
			});
			onGrids.recreate();
			setOpen(false);
			return;
		}
		setError('Killka elementów ma ten sam kolor');
	};

	return (
		<Dialog open={open()} onOpenChange={setOpen}>
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
					<div class="flex items-center justify-between mb-2">
						<h3>Kolory:</h3>
						<button
							type="button"
							class="border-(~ y-white/50 x-white/10) px-4 py-2 rounded hocus:bg-white/20 transition-colors"
							onClick={() => {
								setValues('colors', produce((draft) => {
									draft.push('#ffffff');
								}));
							}}
						>
							Dodaj kolor
						</button>
					</div>
					<ul class="flex-(~ wrap) gap-4 ml-4 max-h-44 overflow-y-auto overflow-x-hidden">
						<For
							each={values.colors}
							children={(it, i) => (
								<li class="flex items-center">
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
										class="i-ph-x"
										onClick={() => {
											setValues('colors', (it) => it.toSpliced(i(), 1));
										}}
									>
										Remove
									</button>
								</li>
							)}
						/>
					</ul>
					<Show when={error()}>
						<p class="text-red-6 my-4">{error()}</p>
					</Show>
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
					<OptionsCheckbox
						checked={values.hidden}
						onChange={(it) => setValues('hidden', it)}
						label="Ukrywaj elementy"
						disabledText={values.tap ? 'Ukrywanie elemenów w trybie syfonu nic nie robi' : ''}
					/>
					<OptionsCheckbox
						checked={values.signed}
						onChange={(it) => setValues('signed', it)}
						label="Oznacz kolory"
					/>
					<OptionsCheckbox
						checked={values.tap}
						onChange={(it) => setValues('tap', it)}
						label="Tryb syfonu"
					/>
					<TheOptionsRestart onClick={() => {
						setValues(defaultConfig());
					}}
					/>
					<div class="flex justify-evenly">
						<button
							type="button"
							class="border-(~ y-white/50 x-white/10) px-4 py-2 rounded hocus:bg-white/20 transition-colors"
							onClick={submit}
						>
							Potwierdź ustawienia
						</button>
						<Dialog.CloseButton type="button" class="border-(~ y-white/50 x-white/10) px-4 py-2 rounded hocus:bg-white/20 transition-colors">
							Anuluj
						</Dialog.CloseButton>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}

function OptionsCheckbox(props: { checked?: boolean, onChange: (value: boolean) => void, label: string, disabledText?: string }): JSXElement {
	return (
		<Checkbox disabled={!!props.disabledText} checked={props.checked} onChange={props.onChange} class="mt-4 flex-(~ wrap) gap-2 items-center">
			<Checkbox.Label>{props.label}: </Checkbox.Label>
			<Checkbox.Input />
			<Checkbox.Control class="i-ph-square data-[checked]:i-ph-check-square text-6" />
			<p class="basis-full text-sm text-orange-4">{props.disabledText}</p>
		</Checkbox>
	);
}

function TheOptionsRestart(props: { onClick: () => void }): JSXElement {
	const [clicked, setClicked] = createSignal(false);

	return (
		<div class="mt-auto mb-4 text-center">
			<button
				type="button"
				onClick={() => {
					if (!clicked()) {
						setClicked(true);
						return;
					}
					setClicked(false);
					props.onClick();
				}}
				class="border-(~ y-white/50 x-white/10) px-4 py-2 rounded hocus:bg-white/20 transition-colors w-48"
			>
				{clicked() ? 'Potwierdź' : 'Zrestartuj ustawienia'}
			</button>
		</div>
	);
}