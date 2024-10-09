import { defineConfig } from "@solidjs/start/config";
import unocss from 'unocss/vite'

export default defineConfig({
	ssr: false,
	vite: {
		plugins: [unocss()],
	}
});
