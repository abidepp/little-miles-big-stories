// Site-wide wording that rarely changes. (Things the family edits often, like the
// Instagram link or homepage text, live in src/content/pages so the editor can change them.)

export const SITE_TITLE = 'Little Miles, Big Stories';
export const SITE_TAGLINE = "It's okay if they don't remember, because we know that we do. 🤍";
export const SITE_PHILOSOPHY = "You don't have to travel less. You just have to travel a little differently.";
export const SITE_STRAPLINE = 'Family travel · Real experiences · Practical guides';
export const SITE_DESCRIPTION =
	'Real family travel journals and practical destination guides, so you can plan your own journey with little ones confidently.';

// The three kinds of article. `category` in each article's frontmatter is one of these keys.
export const CATEGORIES = {
	journal: {
		label: 'Our Journals',
		singular: 'Journal',
		href: '/journals',
		intro: 'Our destination journals: the story of each trip, and everything we learned along the way.',
	},
	guide: {
		label: 'Destination Guides',
		singular: 'Destination Guide',
		href: '/destination-guides',
		intro: 'Detailed, practical guides to the places we have been, written for families planning their own trip.',
	},
	'family-travel': {
		label: 'Family Travel',
		singular: 'Family Travel',
		href: '/family-travel',
		intro: 'Tips, packing lists and honest advice for travelling with little ones.',
	},
} as const;

export type Category = keyof typeof CATEGORIES;
