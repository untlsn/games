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
			let numValue = Number(value);
			if (!Number.isNaN(numValue)) value = `${numValue / 4}rem`
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
			}
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
		transformerCompileClass(),
	],
});
