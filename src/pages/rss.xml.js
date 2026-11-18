// "/rss.xml": a feed of the published journals, for feed readers.
// An "endpoint": Astro calls GET() at build time and saves the result as a file.
import rss from '@astrojs/rss';
import { getJournals, getSingle, hasPage } from '../utils/content';

export async function GET(context) {
	const { data: site } = await getSingle('site');
	const journals = (await getJournals()).filter((j) => j.data.status === 'out-now');
	return rss({
		title: site.title,
		description: site.tagline,
		site: context.site,
		items: journals.map((journal) => ({
			title: journal.data.title,
			description: journal.data.summary,
			link: hasPage(journal) ? `/journals/${journal.id}/` : '/journals/',
		})),
	});
}
