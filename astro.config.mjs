// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// TODO: when littlemilesbigstories.com is connected in Cloudflare, change this to
	// 'https://littlemilesbigstories.com' (and `site_url` in public/admin/config.yml).
	// It's used for share links, social previews, the sitemap and RSS.
	site: 'https://little-miles-big-stories.abinavdepp.workers.dev/',
	integrations: [mdx(), sitemap()],

	// Fonts API: downloaded from Google once at build time and served from this site,
	// so visitors never connect to Google. Used via <Font /> in SiteLayout and global.css.
	fonts: [
		{
			// Elegant editorial serif for headings
			provider: fontProviders.google(),
			name: 'Cormorant Garamond',
			cssVariable: '--font-cormorant',
			weights: [500, 600],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			// Calm, very readable sans for long articles
			provider: fontProviders.google(),
			name: 'Nunito Sans',
			cssVariable: '--font-nunito-sans',
			weights: [400, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			// Handwritten touch for the tagline only, like a note in a journal
			provider: fontProviders.google(),
			name: 'Caveat',
			cssVariable: '--font-caveat',
			weights: [500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['cursive'],
		},
	],
});
