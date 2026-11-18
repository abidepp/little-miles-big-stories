// DATA FLOW, STEP 1: what content exists and what shape it must have.
//
// Every word on the site lives in Markdown files under src/content, so Ish can edit
// it in the editor (/admin) without touching code. At build time Astro reads each
// collection and checks it against its schema; a missing heading or a broken photo
// path stops the build with an error naming the file, so mistakes never go live.
//
// The fields here must match public/admin/config.yml (the editor's form).

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** One page's content file: src/content/pages/<name>/index.md (photos sit next to it). */
const page = (name: string) => glob({ base: `./src/content/pages/${name}`, pattern: 'index.md' });

const link = z.object({ label: z.string(), url: z.string() });
const card = z.object({ title: z.string(), text: z.string() });

// ---------------------------------------------------------------------------
// Journals: one folder per trip, src/content/journals/<slug>/index.md
// Adding London later = adding one folder. The Journals page lists them automatically.
// ---------------------------------------------------------------------------
const journals = defineCollection({
	loader: glob({ base: './src/content/journals', pattern: '*/index.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			status: z.enum(['out-now', 'coming-soon', 'draft']).default('draft'), // draft = hidden
			order: z.number().default(99), // lower numbers are listed first
			tags: z.array(z.string()).default([]), // e.g. ["Journal 01", "Türkiye · 2 days"]
			summary: z.string().optional(),
			cover: image().optional(),
			coverAlt: z.string().optional(),
			pdf: z.string().optional(), // e.g. "/journals/cappadocia.pdf" (file in public/journals)
			cta: link.optional(), // e.g. "Tell us" -> /contact on a coming-soon card
		}),
});

// ---------------------------------------------------------------------------
// Site-wide settings: title, tagline, footer line, Instagram, email, contact form key
// ---------------------------------------------------------------------------
const site = defineCollection({
	loader: page('site'),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		footerLine: z.string(),
		instagramHandle: z.string(), // without the @
		email: z.string().optional(),
		contactFormKey: z.string().optional(), // Web3Forms access key
	}),
});

// ---------------------------------------------------------------------------
// Home (About me). The Markdown body holds the paragraphs.
// ---------------------------------------------------------------------------
const home = defineCollection({
	loader: page('home'),
	schema: ({ image }) =>
		z.object({
			label: z.string(),
			heading: z.string(),
			photo: image().optional(),
			photoAlt: z.string().optional(),
			photoNote: z.string().optional(),
			quote: z.string().optional(),
			button: link,
			banner: z.object({ tag: z.string(), text: z.string(), url: z.string() }).optional(),
		}),
});

// ---------------------------------------------------------------------------
// Our story: seven sections, top to bottom
// ---------------------------------------------------------------------------
const ourStory = defineCollection({
	loader: page('our-story'),
	schema: ({ image }) =>
		z.object({
			intro: z.object({
				heading: z.string(),
				text: z.string(),
				photo: image().optional(),
				photoAlt: z.string().optional(),
			}),
			growing: z.object({ heading: z.string(), cards: z.array(card) }),
			outdoors: z.object({
				heading: z.string(),
				text: z.string(),
				photo: image().optional(),
				photoAlt: z.string().optional(),
			}),
			band: z.object({ kicker: z.string(), heading: z.string(), text: z.string() }),
			needs: z.object({ heading: z.string(), text: z.string(), cards: z.array(card) }),
			places: z.object({
				heading: z.string(),
				items: z.array(z.object({ name: z.string(), note: z.string().optional() })),
			}),
			closing: z.object({ kicker: z.string(), heading: z.string(), button: link }),
		}),
});

// ---------------------------------------------------------------------------
// Journals page copy (the journal cards themselves come from `journals`)
// ---------------------------------------------------------------------------
const journalsPage = defineCollection({
	loader: page('journals'),
	schema: z.object({
		label: z.string(),
		heading: z.string(),
		text: z.string(),
		insideHeading: z.string(),
		inside: z.array(
			card.extend({ icon: z.enum(['calendar', 'wallet', 'heart', 'skip', 'pin', 'sun', 'compass']) }),
		),
		whyHeading: z.string(),
		why: z.array(z.string()),
		listHeading: z.string(),
	}),
});

// ---------------------------------------------------------------------------
// Contact page copy
// ---------------------------------------------------------------------------
const contact = defineCollection({
	loader: page('contact'),
	schema: z.object({
		heading: z.string(),
		text: z.string(),
		privacy: z.string(),
	}),
});

export const collections = { journals, site, home, ourStory, journalsPage, contact };
