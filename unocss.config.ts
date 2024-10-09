import {
	defineConfig, presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	presetWind,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';


export default defineConfig({
	theme: {
		zIndex: {
			top: 999,
		},
	},
	shortcuts: [
		// hocus:bg-black -> hover:bg-black focus:bg-black
		[/hocus:(.+)/, ([,content]) => {
			return `hover:${content} focus:${content}`;
		}],
		// max-size-40 -> max-h-40 max-w-40
		[/((min|max)-)?size-(.+)/, function([, prefix = '', , value]) {
			if (value?.endsWith('v')) {
				return `${prefix}w-${value}w ${prefix}h-${value}h`;
			}
			return `${prefix}w-${value} ${prefix}h-${value}`;
		}],
		/** grid-cols-3_1 is equal to grid-cols-[3fr_1fr] */
		[/^grid-(cols|rows)-([\d_]{3,})$/, ([, type = '', numbers = '']) => {
			return `grid-${type}-[${numbers.replaceAll('_', 'fr_')}fr]`;
		}],
		/** grid-cols-auto-4 is equal to grid-cols-[auto_auto_auto_auto] */
		[/^grid-(cols|rows)-auto-(\d+)$/, ([, type, value = '0']) => {
			return `grid-${type}-[repeat(${value},auto)]`;
		}],
		/** grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr)); */
		[/^grid-(cols|rows)-fit-(\S+)$/, ([, type, value]) => {
			const numValue = Number(value);
			if (!Number.isNaN(numValue)) value = `${numValue / 4}rem`;
			return `grid-${type}-[repeat(auto-fit,minmax(${value},1fr))]`;
		}],
	],
	presets: [
		presetWind(),
		presetUno(),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: 'Roboto',
			},
		}),
		presetIcons({
			extraProperties: {
				display:       'inline-block',
				height:        'auto',
				'min-height':  '1em',
				'white-space': 'nowrap',
			},
			collections: {
				my: {
					tap: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M192 96v12L96 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l96-12l31-3.9l1-.1l1 .1l31 3.9l96 12c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 12V96c0-17.7-14.3-32-32-32s-32 14.3-32 32M32 256c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h100.1c20.2 29 53.9 48 91.9 48s71.7-19 91.9-48H352c17.7 0 32 14.3 32 32s14.3 32 32 32h64c17.7 0 32-14.3 32-32c0-88.4-71.6-160-160-160h-32l-22.6-22.6c-6-6-14.1-9.4-22.6-9.4H256v-43.8l-32-4l-32 4V224h-18.7c-8.5 0-16.6 3.4-22.6 9.4L128 256z"/></svg>',
				},
			},
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
		transformerCompileClass(),
	],
});
