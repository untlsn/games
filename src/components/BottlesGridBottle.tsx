import { For } from 'solid-js';
import { useConfig } from '~/hooks/ConfigContext';

type Each = { hidden?: boolean, color: string, sign: string };

export default function BottlesGridBottle(props: { fills: string[], onClick: () => void, isSelected: boolean, isSuccess?: boolean }): JSXElement {
	const [config] = useConfig();

	const each = () => {
		if (!config.hidden) return props.fills.map((color): Each => ({
			color,
			sign: config.signed ? String(config.colors.indexOf(color)) : '',
		}));
		const res: Each[] = [];

		for (const color of props.fills) {
			const last = res[res.length - 1];
			const hidden = last && (last.hidden || last.color != color);
			res.push({
				color: hidden ? '#61397c' : color,
				sign:  hidden ? '?' : config.signed ? String(config.colors.indexOf(color)) : '',
			});
		}

		return res;
	};

	return (
		<div
			class="h-40 w-10 border-(2 t-0 white/30) rounded-b-full grid-(~ rows-4) gap-1 p-2px transition-all last:children:rounded-b-full aria-[selected=true]:-translate-y-12 not-empty:cursor-pointer aria-[disabled=true]:opacity-30"
			aria-selected={props.isSelected}
			aria-disabled={props.isSuccess}
			onClick={() => !props.isSuccess && props.onClick()}
		>
			<For
				each={each()}
				children={(it, i) => {
					return (
						<div
							style={{ '--background-color': it.color, '--background-color-to': it.color + '66', '--start': 5 - props.fills.length + i() }}
							class="text-center pt-2 row-start-[--start] bg-gradient-to-rb from-[--background-color] to-[--background-color-to]"
							textContent={it.sign}
						/>
					);
				}}
			/>
		</div>
	);
}