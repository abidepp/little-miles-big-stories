// src/pages/rss.xml.js  ->  "/rss.xml"
//
// Not every page has to be HTML. A .js/.ts file in src/pages that exports GET()
// is an "endpoint": at build time Astro calls GET() and saves what it returns as a file.

import rss from '@astrojs/rss';
import { getJournals } from '../utils/journals';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const journals = await getJournals();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		// RSS readers expect specific field names (pubDate, description), so we map
		// our schema's fields onto them rather than spreading entry.data.
		items: journals.map((journal) => ({
			title: journal.data.title,
			pubDate: journal.data.date,
			description: journal.data.excerpt,
			link: `/journals/${journal.id}/`,
		})),
	});
}
