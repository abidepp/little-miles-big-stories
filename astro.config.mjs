// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://little-miles-big-stories.abinavdepp.workers.dev/',
	integrations: [mdx(), sitemap()],
});
