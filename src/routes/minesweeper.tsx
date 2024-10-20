import { For, Match, Show, Switch } from 'solid-js';
import { Checkbox } from '@kobalte/core/checkbox';
import clsx from 'clsx';
import createMineStore from '~/hooks/createMineStore';
import { Title } from '@solidjs/meta';


export default function ThePage(): JSXElement {
	const [mineStore, onMineStore] = createMineStore(30);

	return (
		<div class="grid place-items-center min-h-screen">
			<Title>Untlsn-Games - MineSweeper</Title>
			<a href="/" class="i-ph-caret-left absolute left-12 top-12 text-8">
				Strona główna
			</a>
			<div
				class="border-(~ white/10) bg-white/2 w-98vw max-w-240"
			>
				<nav class="flex justify-center my-4 gap-4">
					<Checkbox onChange={onMineStore.flagChange}>
						<Checkbox.Control class="border-1 rounded p-1 size-8 text-center cursor-pointer">
							<Checkbox.Indicator
								forceMount
								class="text-5 data-[checked]:i-ph-flag-pennant-fill i-ph-shovel-fill"
							/>
						</Checkbox.Control>
						<Checkbox.Input />
					</Checkbox>
					<button
						type="button"
						class="border-1 rounded py-1 px-2 h-8"
						onClick={onMineStore.reset}
					>
						Zresetuj
					</button>
				</nav>
				<div
					style={{ 'grid-template-columns': `repeat(${mineStore.width}, 1fr)` }}
					class="w-fit grid gap-1 place-items-center mx-auto relative"
				>
					<Show when={mineStore.failed}>
						<div class="grid place-items-center absolute inset-0 size-full bg-black/33 z-top">
							<p class="text-20">Przegrałeś</p>
						</div>
					</Show>
					<For
						each={mineStore.pool}
						children={(it, i) => (
							<button
								type="button"
								class={clsx(
									'size-5 rounded text-(center black) transition-all',
									it.show ? 'bg-gray-2' : 'bg-gray-4',
								)}
								disabled={mineStore.failed || !mineStore.flagMode && it.show}
								onClick={() => onMineStore.poolClick(i())}
							>
								<Switch>
									<Match when={it.show}>
										{it.value == 'x' ? <i class="i-ph-bomb-fill mt-px text-red-5" /> : it.value}
									</Match>
									<Match when={it.flag}>
										<i class="i-ph-flag-pennant-fill text-red-5" />
									</Match>
								</Switch>
							</button>
						)}
					/>
				</div>
			</div>
		</div>
	);
}