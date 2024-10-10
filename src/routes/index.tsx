export default function Page(): JSXElement {
	return (
		<main class="grid place-items-center min-h-screen">
			<GameLink href="/bottles" label="Butelki" img="/mini/bottles.webp" />
			<GameLink href="/minesweeper" label="Saper" img="/mini/bottles.webp" />
		</main>
	);
}

function GameLink(props: { href: string, img: string, label: string }): JSXElement {
	return (
		<a href={props.href} class="grid place-items-center transition-filter hocus:blur-2">
			<span class="text-8">{props.label}</span>
			<img src={props.img} alt={props.label} class="w-50 rounded-lg shadow-(lg white/10) border-(~ white/10)" />
		</a>
	);
}