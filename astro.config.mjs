// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// TODO: when littlemilesbigstories.com is connected, change this to
	// 'https://littlemilesbigstories.com' (and site_url in public/admin/config.yml,
	// and Sitemap in public/robots.txt). Used for share links, social previews and the sitemap.
	site: 'https://little-miles-big-stories.abinavdepp.workers.dev/',
	integrations: [mdx(), sitemap()],

	// Old addresses that may already have been shared
	redirects: {
		'/about': '/our-story',
	},

	// Fonts API: downloaded from Google once at build time and served from this site.
	// To change the heading font, swap the first entry (and keep cssVariable the same).
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Cormorant Garamond',
			cssVariable: '--font-heading-face',
			weights: [600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Nunito Sans',
			cssVariable: '--font-body-face',
			weights: [400, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Caveat',
			cssVariable: '--font-hand-face',
			weights: [500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['cursive'],
		},
	],
});
