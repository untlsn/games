import { For } from 'solid-js';
import '~/assets/style';
import clsx from 'clsx';
import { createStore } from 'solid-js/store';

export default function App() {
  const [grids, setGrids] = createStore([
		['red', 'red', 'red', 'red'],
		['red', 'red', 'red', 'red'],
		['red', 'red', 'red', 'red'],
		['red', 'red', 'red', 'red'],
		['red', 'red', 'red', 'red'],
		['red', 'red', 'red', 'red'],
		[],
		[],
	])

  return (
    <main class="grid place-items-center min-h-screen bg-[#121212]">
      <div class="grid-(~ cols-4) size-50vh">
				<For each={grids} children={(fills) => (
					<Bottle
						fills={fills}
					/>
				)} />
			</div>
    </main>
  );
}

function Bottle(props: { fills: string[] }): JSXElement {
	return (
		<div class="h-40 w-10 border-2 border-t-0 rounded-b-full grid-(~ rows-4) gap-1 p-2px">
			<For each={props.fills} children={(color, i) => (
				<div
					style={{ 'background-color': color }}
					class={clsx(i() == 3 && 'rounded-b-full')}
				/>
			)}/>
		</div>
	);
}
