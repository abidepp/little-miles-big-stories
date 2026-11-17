// DATA FLOW, STEP 2: every page gets its data through these helpers, so the
// homepage, list pages, destination pages and RSS feed can never disagree.

import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Category } from '../consts';

export type Journal = CollectionEntry<'journals'>;

/** All articles, newest first. Pass a category to filter. */
export async function getJournals(category?: Category): Promise<Journal[]> {
	const all = await getCollection('journals', (entry) => !category || entry.data.category === category);
	return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** "Turkey" -> "turkey", "United Kingdom" -> "united-kingdom" */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

export interface Destination {
	country: string;
	slug: string;
	journals: Journal[]; // newest first
	cover?: Journal['data']['cover'];
	coverAlt?: string;
}

/** Groups articles by country. New countries appear automatically. */
export async function getDestinations(): Promise<Destination[]> {
	const byCountry = new Map<string, Destination>();
	for (const journal of await getJournals()) {
		const country = journal.data.country?.trim();
		if (!country) continue;
		const slug = slugify(country);
		if (!byCountry.has(slug)) byCountry.set(slug, { country, slug, journals: [] });
		byCountry.get(slug)!.journals.push(journal);
	}
	return [...byCountry.values()]
		.map((d) => {
			const withCover = d.journals.find((j) => j.data.cover);
			return { ...d, cover: withCover?.data.cover, coverAlt: withCover?.data.coverAlt };
		})
		.sort((a, b) => b.journals.length - a.journals.length || a.country.localeCompare(b.country));
}

/** "Cappadocia, Turkey" style label for cards and headers. */
export function placeLabel(data: Journal['data']): string {
	const place = data.destination ?? data.location;
	if (place && data.country && !place.includes(data.country)) return `${place}, ${data.country}`;
	return place ?? data.country ?? '';
}

export function readingTime(body: string | undefined): string {
	const words = body?.trim().split(/\s+/).length ?? 0;
	return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function formatDate(date: Date, style: 'full' | 'month' = 'full'): string {
	return date.toLocaleDateString('en-GB', {
		day: style === 'full' ? 'numeric' : undefined,
		month: 'long',
		year: 'numeric',
	});
}

/** Editable page content (home / about / contact). */
export async function getPage(id: 'home' | 'about' | 'contact') {
	const page = await getEntry('pages', id);
	if (!page) throw new Error(`Missing src/content/pages/${id}/index.md`);
	return page;
}

/** Social links & email, edited on the Contact page in the editor. */
export async function getSocial() {
	const { data } = await getPage('contact');
	return {
		email: data.email,
		instagram: data.instagram || 'https://www.instagram.com/',
		linktree: data.linktree,
	};
}
