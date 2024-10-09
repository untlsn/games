import '~/assets/style';
import createGrids, { GridsProvider } from '~/hooks/createGrids';
import { ConfigProvider, createConfig } from '~/hooks/ConfigContext';
import TheMenuButtons from '~/components/TheMenuButtons';
import TheBottlesGrid from '~/components/TheBottlesGrid';

export default function App(): JSXElement {
	const [config, setConfig] = createConfig();

	return (
		<ConfigProvider value={[config, setConfig]}>
			<GridsProvider value={createGrids(config)}>
				<div class="min-h-screen bg-[#15051C] text-white grid place-items-center">
					<div class="border-(~ white/10) bg-white/2 w-98vw max-w-240">
						<TheMenuButtons />
						<TheBottlesGrid />
					</div>
				</div>
			</GridsProvider>
		</ConfigProvider>
	);
}