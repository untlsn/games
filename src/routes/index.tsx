export default function Index(): JSXElement {
	return (
		<main class="grid place-items-center min-h-screen">
			<a href="/bottles" class="grid place-items-center transition-filter hocus:blur-2">
				<span class="text-8">Butelki</span>
				<img src="/mini/bottles.webp" alt="butelki" class="w-50 rounded-lg shadow-(lg white/10) border-(~ white/10)" />
			</a>
		</main>
	);
}