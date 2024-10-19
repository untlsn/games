import { defineConfig } from '@solidjs/start/config';
import unocss from 'unocss/vite';

export default defineConfig({
	server: {
		prerender: {
			crawlLinks: true,
		},
	},
	vite: {
		plugins: [unocss()],
	},
});
