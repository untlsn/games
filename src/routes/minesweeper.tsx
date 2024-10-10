import { batch, For } from 'solid-js';
import { createStore } from 'solid-js/store';

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
};

function createPool(width: number): PoolPoint[] {
	const pool = Array<string>(width * 30).fill('');
	for (let i = 0; i < 100; i++) {
		pool[randomInt(pool.length)] = 'x';
	}
	return pool.map((it, i, arr) => {
		if (it == 'x') return { value: 'x' };
		const count = countX(
			arr[i - width - 1], arr[i - width], arr[i - width + 1],
			i % width != 0 && arr[i - 1], (i % width != width - 1) && arr[i + 1],
			arr[i + width - 1], arr[i + width], arr[i + width + 1],
		);

		return { value: String(count || '') };
	});
}

export default function ThePage(): JSXElement {
	const [mineStore, setMineStore] = createStore({
		pool:  createPool(30),
		width: 30,
	});

	const showEmptyRec = (i: number) => {
		const el = mineStore.pool[i]!;
		if (!el || el.show || el.value == 'x') return false;
		setMineStore('pool', i, 'show', true);
		if (el.value != '') return;

		const width = mineStore.width;
		if (i % width != 0) showEmptyRec(i - 1);
		if (i % width != width - 1) showEmptyRec(i + 1);
		showEmptyRec(i - width);
		showEmptyRec(i + width);
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
				<div
					style={{ 'grid-template-columns': `repeat(${mineStore.width}, 1fr)` }}
					class="w-fit grid gap-1 place-items-center mx-auto"
				>
					<For
						each={mineStore.pool}
						children={(it, i) => (
							<button
								type="button"
								class="size-5 bg-gray-4 rounded text-(center black) disabled:bg-gray-2 transition-all"
								disabled={it.show}
								textContent={it.show ? it.value : ''}
								onClick={() => {
									batch(() => {
										if (showEmptyRec(i())) return;
										if (mineStore.pool[i()]!.value == 'x') return;
										setMineStore('pool', i(), 'show', true);
									});
								}}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
}