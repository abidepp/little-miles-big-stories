// src/pages/rss.xml.js  ->  "/rss.xml"
// An "endpoint": Astro calls GET() at build time and saves the result as a file.

import rss from '@astrojs/rss';
import { getJournals } from '../utils/journals';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const journals = await getJournals();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: journals.map((journal) => ({
			title: journal.data.title,
			pubDate: journal.data.date,
			description: journal.data.excerpt,
			link: `/journals/${journal.id}/`,
		})),
	});
}
