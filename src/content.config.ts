// DATA FLOW, STEP 1: where content comes from and what shape it must have.
//
// At build time Astro runs each collection's `loader` (reads files from disk), then
// checks every file's frontmatter against its `schema`. A missing title or a broken
// photo path stops the build with an error naming the file, so mistakes never go live.
//
// The fields here must match public/admin/config.yml (the editor's form fields).
// If you add a field, add it in both places.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const journals = defineCollection({
	// One folder per article: src/content/journals/<slug>/index.md, photos next to it.
	// "cappadocia/index.md" gets the id "cappadocia" -> URL /journals/cappadocia
	loader: glob({ base: './src/content/journals', pattern: '**/index.{md,mdx}' }),

	// `image()` resolves a photo path relative to the Markdown file and lets
	// <Image /> resize/compress it at build time.
	schema: ({ image }) =>
		z.object({
			// Basics
			title: z.string(),
			excerpt: z.string().optional(), // one or two sentences for cards & social previews
			date: z.coerce.date(), // publish date
			category: z.enum(['journal', 'guide', 'family-travel']).default('journal'),
			featured: z.boolean().default(false), // show in "Featured journals" on the homepage

			// Where
			destination: z.string().optional(), // e.g. "Cappadocia"
			country: z.string().optional(), // e.g. "Turkey" -> /destinations/turkey
			location: z.string().optional(), // older field; used if destination is empty

			// Photos
			cover: image().optional(),
			coverAlt: z.string().optional(),
			closingPhoto: image().optional(), // family photo at the end of the article
			closingAlt: z.string().optional(),
			closingCaption: z.string().optional(),

			// Trip at a glance
			travelDates: z.string().optional(), // e.g. "April 2026"
			tripLength: z.string().optional(), // e.g. "5 days"
			travelledWith: z.string().optional(), // e.g. "Two adults and a 2-year-old"
			bestFor: z.string().optional(), // e.g. "Toddlers, slow travellers"
			budget: z.string().optional(), // headline total, e.g. "£1,450 for 3"
			budgetBreakdown: z.array(z.object({ item: z.string(), cost: z.string() })).optional(),

			// Extras
			mapEmbed: z.string().optional(), // Google Maps "Embed a map" code or its link
			usefulLinks: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
			pdfGuide: z.string().optional(), // e.g. "/guides/cappadocia.pdf" (lives in public/guides)
		}),
});

// Editable site pages: home, about, contact. Each is src/content/pages/<id>/index.md.
// Only some fields apply to each page, so everything is optional.
const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '*/index.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string().optional(),
			intro: z.string().optional(),
			photo: image().optional(),
			photoAlt: z.string().optional(),
			facts: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
			// contact page = site-wide social settings
			email: z.string().optional(),
			instagram: z.string().optional(),
			linktree: z.string().optional(),
		}),
});

export const collections = { journals, pages };
