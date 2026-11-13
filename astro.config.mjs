// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://little-miles-big-stories.abinavdepp.workers.dev/',
	integrations: [mdx(), sitemap()],

	// Fonts API: at build time Astro downloads these from Google once and serves
	// them from your own site, so visitors never connect to Google.
	// Each `cssVariable` is then used via <Font /> in SiteLayout and in global.css.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Fraunces',
			cssVariable: '--font-fraunces',
			weights: [500, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Nunito',
			cssVariable: '--font-nunito',
			weights: [400, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
	],
});
