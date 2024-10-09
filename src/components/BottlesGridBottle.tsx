import clsx from 'clsx';
import { For } from 'solid-js';
import { useConfig } from '~/hooks/ConfigContext';

export default function BottlesGridBottle(props: { fills: string[], onClick: () => void, isSelected: boolean }): JSXElement {
	const [config] = useConfig();

	return (
		<div
			class={clsx(
				"h-40 w-10 border-(2 t-0 white/30) rounded-b-full grid-(~ rows-4) gap-1 p-2px transition-transform last:children:rounded-b-full",
				props.isSelected && '-translate-y-12',
				props.fills.length && 'cursor-pointer',
			)}
			onClick={props.onClick}
		>
			<For each={Array(4 - props.fills.length)} children={() => <div />} />
			<For each={props.fills} children={(color, i) => {
				return (
					<div
						style={{ '--background-color': color, '--background-color-to': color+'66', }}
						class={clsx(
							'text-center pt-2',
							!config.hidden || i() == 0 || (color == props.fills[0] && color == props.fills[i() - 1])
								? 'bg-gradient-to-rb from-[--background-color] to-[--background-color-to] text-transparent'
								: "bg-gradient-to-br from-[#61397c] to-[#2f205e]",
						)}
					>
						?
					</div>
				)
			}}/>
		</div>
	);
}