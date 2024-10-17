import type { MineStore, PoolPoint } from '~/hooks/createMineStore.types';

function randomInt(max: number) {
	return Math.floor(Math.random() * max);
}

function countMines(...strArr: (string | undefined | boolean)[]) {
	let res = 0;
	for (const str of strArr) {
		if (str == 'x') res++;
	}

	return res;
}

function getValidSiblingHorizontal(i: number, width: number) {
	const res: number[] = [];

	if (i % width != 0) res.push(i - 1);
	if (i % width != width - 1) res.push(i + 1);

	return res;
}

export function getValidSibling(i: number, width: number): number[] {
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


export function countBy<T>(arr: T[], cb: (value: T) => boolean): number {
	let res = 0;
	for (const it of arr) if (cb(it)) res++;
	return res;
}

export function createPool(width: number): PoolPoint[] {
	const pool = Array<string>(width * 30).fill('');
	for (let i = 0; i < 100; i++) {
		pool[randomInt(pool.length)] = 'x';
	}
	return pool.map((it, i, arr) => {
		if (it == 'x') return { value: 'x' };
		const count = countMines(
			...getValidSibling(i, width).map((it) => arr[it]),
		);

		return { value: String(count || '') };
	});
}

export function showEmptyRec(draft: MineStore, index: number): boolean {
	const el = draft.pool[index]!;
	if (!el || el.show || el.value == 'x') return false;
	el.show = true;
	if (el.value != '') return false;

	const width = draft.width;
	getValidSibling(index, width).forEach((it) => showEmptyRec(draft, it));
	return true;
}