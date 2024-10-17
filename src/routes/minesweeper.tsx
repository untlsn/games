import { batch, For, Match, Switch, untrack } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Checkbox } from '@kobalte/core/checkbox';
import clsx from 'clsx';

function countX(...strArr: (string | undefined | boolean)[]) {
	let res = 0;
	for (const str of strArr) {
		if (str == 'x') res++;
	}

	return res;
}

function randomInt(max: number) {
	return Math.floor(Math.random() * max);
}

type PoolPoint = {
	value: string,
	show?: boolean,
	flag?: boolean,
};

function getValidSiblingHorizontal(i: number, width: number) {
	const res: number[] = [];

	if (i % width != 0) res.push(i - 1);
	if (i % width != width - 1) res.push(i + 1);

	return res;
}

function getValidSibling(i: number, width: number) {
	const res: number[] = [];

	res.push(...getValidSiblingHorizontal(i, width));
	if (i >= width) {
		res.push(i - width);
		res.push(...getValidSiblingHorizontal(i - width, width));
	}
	res.push(i + width);
	res.push(...getValidSiblingHorizontal(i + width, width));

	return res;
}

function createPool(width: number): PoolPoint[] {
	const pool = Array<string>(width * 30).fill('');
	for (let i = 0; i < 100; i++) {
		pool[randomInt(pool.length)] = 'x';
	}
	return pool.map((it, i, arr) => {
		if (it == 'x') return { value: 'x' };
		const count = countX(
			...getValidSibling(i, width).map((it) => arr[it]),
		);

		return { value: String(count || '') };
	});
}

function countBy<T>(arr: T[], cb: (value: T) => boolean) {
	let res = 0;
	for (const it of arr) if (cb(it)) res++;
	return res;
}

export default function ThePage(): JSXElement {
	const [mineStore, setMineStore] = createStore({
		pool:     createPool(30),
		width:    30,
		flagMode: false,
	});

	const showEmptyRec = (i: number) => {
		const el = mineStore.pool[i]!;
		if (!el || el.show || el.value == 'x') return false;
		setMineStore('pool', i, 'show', true);
		if (el.value != '') return;

		const width = mineStore.width;
		getValidSibling(i, width).forEach(showEmptyRec);
		return true;
	};

	return (
		<div class="grid place-items-center min-h-screen">
			<a href="/" class="i-ph-caret-left absolute left-12 top-12 text-8">
				Strona główna
			</a>
			<div
				class="border-(~ white/10) bg-white/2 w-98vw max-w-240"
			>
				<nav class="flex justify-center my-4">
					<Checkbox onChange={(it) => setMineStore('flagMode', it)}>
						<Checkbox.Control class="border-1 rounded p-1 size-8 text-center cursor-pointer">
							<Checkbox.Indicator
								forceMount
								class="text-5 data-[checked]:i-ph-flag-pennant-fill i-ph-shovel-fill"
							/>
						</Checkbox.Control>
						<Checkbox.Input />
					</Checkbox>
				</nav>
				<div
					style={{ 'grid-template-columns': `repeat(${mineStore.width}, 1fr)` }}
					class="w-fit grid gap-1 place-items-center mx-auto"
				>
					<For
						each={mineStore.pool}
						children={(it, i) => (
							<button
								type="button"
								class={clsx(
									'size-5 rounded text-(center black) transition-all',
									it.show ? 'bg-gray-2' : 'bg-gray-4',
								)}
								disabled={!mineStore.flagMode && it.show}
								onClick={() => batch(() => {
									const pool = untrack(() => mineStore.pool);
									if (mineStore.flagMode) {
										if (!pool[i()]!.show) {
											return setMineStore('pool', i(), 'flag', (it) => !it);
										}
										const poolCount = +(pool[i()]!.value || '_');
										if (isNaN(poolCount)) return;
										const sibling = getValidSibling(i(), mineStore.width);
										const flagSiblings = countBy(sibling, (poolIndex) => !!pool[poolIndex]?.flag);
										if (flagSiblings != poolCount) return;
										sibling.forEach(showEmptyRec);
									}

									if (showEmptyRec(i())) return;
									if (mineStore.pool[i()]!.value == 'x') return;
									setMineStore('pool', i(), 'show', true);
								})}
							>
								<Switch>
									<Match when={it.show}>
										{it.value}
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