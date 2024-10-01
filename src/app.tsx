import '~/assets/style';
import createGrids from '~/hooks/createGrids';
import { createConfig } from '~/hooks/ConfigContext';
import RestoreButtons from '~/components/RestoreButtons';
import BottlesGrid from '~/components/BottlesGrid';
import Options from '~/components/Options';

export default function App() {
	const [config, setConfig] = createConfig();
  const [grids, onGrids] = createGrids(config)

  return (
    <div class="grid-(~ cols-1_2_1 rows-1_4) min-h-screen bg-[#121212] text-white">
			<RestoreButtons onGrids={onGrids} />
			<div />
			<BottlesGrid grids={grids} config={config} onSelect={(i) => {
				setConfig('selected', onGrids.select(i))
			}} />
			<Options setConfig={setConfig} config={config} />
		</div>
  );
}