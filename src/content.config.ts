// DATA FLOW, STEP 1: where content comes from and what shape it must have.
//
// At build time Astro runs each collection's `loader`, which reads files from disk,
// then checks every file's frontmatter against the `schema`. If a journal is missing
// a title, or `date` isn't a date, the build stops with an error naming the file.
// Pages then read the validated data with getCollection() / getEntry().

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const journals = defineCollection({
	// Every .md/.mdx file in src/content/journals becomes one entry.
	// The file name (minus extension) becomes `entry.id`, e.g. "yorkshire-dales".
	loader: glob({ base: './src/content/journals', pattern: '**/*.{md,mdx}' }),

	// `schema` is a function so Astro can hand us the `image()` helper.
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.coerce.date(), // "2026-10-15" in frontmatter -> a real Date object
			location: z.string().optional(),
			excerpt: z.string().optional(),

			// image() resolves a path *relative to the Markdown file* to a file in src/,
			// and gives back an object with src/width/height/format that <Image /> can optimise.
			cover: image().optional(),
			coverAlt: z.string().optional(), // describe the photo for screen readers

			// "Trip at a glance" details, shown on the journal page when present.
			destination: z.string().optional(),
			country: z.string().optional(),
			category: z.enum(['Journal', 'Destination Guide', 'Family Travel']).optional(),
			tripLength: z.string().optional(), // e.g. "5 days"
			budget: z.string().optional(), // e.g. "£1,450 for 3"
			pdfGuide: z.string().optional(), // path under /public, e.g. "/guides/yorkshire.pdf"
		}),
});

export const collections = { journals };
