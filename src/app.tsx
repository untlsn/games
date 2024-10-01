import '~/assets/style';
import createGrids from '~/hooks/createGrids';
import { ConfigProvider, createConfig } from '~/hooks/ConfigContext';
import RestoreButtons from '~/components/RestoreButtons';
import BottlesGrid from '~/components/BottlesGrid';
import TheOptions from '~/components/TheOptions';

export default function App() {
	const [config, setConfig] = createConfig();
  const [grids, onGrids] = createGrids(config)

  return (
		<ConfigProvider value={[config, setConfig]}>
			<div class="grid-(~ cols-1_2_1 rows-1_4) min-h-screen bg-[#121212] text-white">
				<RestoreButtons onGrids={onGrids}/>
				<div/>
				<BottlesGrid grids={grids} onSelect={(i) => {
					setConfig('selected', onGrids.select(i))
				}}/>
				<TheOptions />
			</div>
		</ConfigProvider>
	);
}