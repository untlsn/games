import clsx from 'clsx';
import { For } from 'solid-js';

export default function Bottle(props: { fills: string[], onClick: () => void, isSelected: boolean }): JSXElement {
	return (
		<div
			class={clsx(
				"h-40 w-10 border-2 border-t-0 rounded-b-full grid-(~ rows-4) gap-1 p-2px transition-transform last:children:rounded-b-full",
				props.isSelected && '-translate-y-12',
				props.fills.length && 'cursor-pointer',
			)}
			onClick={props.onClick}
		>
			<For each={Array(4 - props.fills.length)} children={() => <div />} />
			<For each={props.fills} children={(color) => (
				<div
					style={{ 'background-color': color }}
				/>
			)}/>
		</div>
	);
}
