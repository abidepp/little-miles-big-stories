import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			destination: z.string(),
			country: z.string(),
			category: z.enum(['Journal', 'Destination Guide', 'Family Travel']),
			tripLength: z.string().optional(),      // e.g. "5 days"
			budget: z.string().optional(),          // e.g. "£1,450 for 3"
			pdfGuide: z.string().optional(), 
		}),
});

export const collections = { blog };
