import '~/assets/style';
import createGrids from '~/hooks/createGrids';
import { ConfigProvider, createConfig } from '~/hooks/ConfigContext';
import RestoreButtons from '~/components/RestoreButtons';
import BottlesGrid from '~/components/BottlesGrid';

export default function App() {
	const [config, setConfig] = createConfig();
  const [grids, onGrids] = createGrids(config)

  return (
		<ConfigProvider value={[config, setConfig]}>
			<div class="min-h-screen bg-[#15051C] text-white grid place-items-center">
				<div class="border-(~ white/10) bg-white/2 w-98vw max-w-240">
					<RestoreButtons onGrids={onGrids}/>
					<BottlesGrid grids={grids} onSelect={(i) => {
						setConfig('selected', onGrids.select(i))
					}}/>
				</div>
			</div>
		</ConfigProvider>
	);
}