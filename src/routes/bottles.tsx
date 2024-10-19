import { TheGridsProvider } from '~/hooks/GridsContext';
import TheMenuButtons from '~/components/TheMenuButtons';
import TheBottlesGrid from '~/components/TheBottlesGrid';
import { TheConfigProvider } from '~/hooks/ConfigContext';
import { Title } from '@solidjs/meta';

export default function ThePage(): JSXElement {
	return (
		<TheConfigProvider>
			<TheGridsProvider>
				<Title>Untlsn-Games - Bottles</Title>
				<div class="grid place-items-center min-h-screen">
					<a href="/" class="i-ph-caret-left absolute left-12 top-12 text-8">
						Strona główna
					</a>
					<div class="border-(~ white/10) bg-white/2 w-98vw max-w-240">
						<TheMenuButtons />
						<TheBottlesGrid />
					</div>
				</div>
			</TheGridsProvider>
		</TheConfigProvider>
	);
}