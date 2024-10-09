import '~/assets/style';
import { TheGridsProvider } from '~/hooks/GridsContext';
import { TheConfigProvider } from '~/hooks/ConfigContext';
import TheMenuButtons from '~/components/TheMenuButtons';
import TheBottlesGrid from '~/components/TheBottlesGrid';

export default function App(): JSXElement {
	return (
		<TheConfigProvider>
			<TheGridsProvider>
				<div class="min-h-screen bg-[#15051C] text-white grid place-items-center">
					<div class="border-(~ white/10) bg-white/2 w-98vw max-w-240">
						<TheMenuButtons />
						<TheBottlesGrid />
					</div>
				</div>
			</TheGridsProvider>
		</TheConfigProvider>
	);
}