// DATA FLOW, STEP 2: one place that fetches and sorts journals.
//
// The homepage, the journals list, each journal page and the RSS feed all need
// "every journal, newest first". Putting it here means they can't drift apart.

import { getCollection, type CollectionEntry } from 'astro:content';

// The type of one journal entry: { id, data: { title, date, ... }, body, ... }.
// It is generated from the schema in content.config.ts, so the editor knows every field.
export type Journal = CollectionEntry<'journals'>;

export async function getJournals(): Promise<Journal[]> {
	const journals = await getCollection('journals');
	return journals.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, style: 'full' | 'month' = 'full'): string {
	return date.toLocaleDateString('en-GB', {
		day: style === 'full' ? 'numeric' : undefined,
		month: 'long',
		year: 'numeric',
	});
}
