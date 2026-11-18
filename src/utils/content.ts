// DATA FLOW, STEP 2: small helpers every page uses to read content.

import { getCollection, type CollectionEntry } from 'astro:content';

export type Journal = CollectionEntry<'journals'>;

/** A single-page collection (site, home, ourStory, …) has exactly one entry. */
export async function getSingle<C extends 'site' | 'home' | 'ourStory' | 'journalsPage' | 'contact'>(name: C) {
	const [entry] = await getCollection(name);
	if (!entry) throw new Error(`Missing content file for "${name}" in src/content/pages`);
	return entry;
}

/** Visible journals: "out now" first, then "coming soon", each by `order`. Drafts are hidden. */
export async function getJournals(): Promise<Journal[]> {
	const rank = { 'out-now': 0, 'coming-soon': 1, draft: 2 } as const;
	const all = await getCollection('journals', ({ data }) => data.status !== 'draft');
	return all.sort((a, b) => rank[a.data.status] - rank[b.data.status] || a.data.order - b.data.order);
}

/** A journal gets its own page (/journals/<slug>) only once it has a written story. */
export function hasPage(journal: Journal): boolean {
	return journal.data.status === 'out-now' && Boolean(journal.body?.trim());
}

export function instagramUrl(handle: string): string {
	return `https://www.instagram.com/${handle.replace(/^@/, '')}/`;
}

/** Bracketed text like "[YOUR EMAIL]" means "still to be filled in". */
export function isPlaceholder(text: string | undefined): boolean {
	return !text || /^\[.*\]$/.test(text.trim());
}
