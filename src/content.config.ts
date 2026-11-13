import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';


const journals = defineCollection({
	loader: glob({ base: './src/content/journals', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		location: z.string().optional(),
		excerpt: z.string().optional(),
		cover: z.string().optional(), 
		destination: z.string().optional(),
		country: z.string().optional(),
		category: z.enum(['Journal', 'Destination Guide', 'Family Travel']).optional(),
		tripLength: z.string().optional(),      // e.g. "5 days"
		budget: z.string().optional(),          // e.g. "£1,450 for 3"
		pdfGuide: z.string().optional(),  // path under /public, e.g. "/images/wales/coverphoto.png"
	}),
});

export const collections = { journals };

