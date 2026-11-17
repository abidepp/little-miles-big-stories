# Little Miles, Big Stories

A family travel journal and practical travel resource, built with [Astro](https://docs.astro.build) and deployed as a static site on Cloudflare Workers.

**Publishing articles:** see [PUBLISHING.md](PUBLISHING.md). Articles are written in the editor at `/admin` (Sveltia CMS); no code needed.

## How it fits together

```text
src/content/journals/<slug>/index.md   one folder per article (+ its photos)
src/content/pages/{home,about,contact} editable page text, photos, social links
src/content.config.ts                  schema: the fields every article may have
public/admin/config.yml                the editor's form (must match the schema)
src/utils/journals.ts                  getJournals(), getDestinations(), …
src/pages/                             one file per route; [slug] = one page per article
src/layouts/SiteLayout.astro           shared <head>, header, footer
src/components/                        JournalCard, ShareButtons, CategoryListing, …
```

Publishing in the editor → commit to `main` (via a draft PR) → Cloudflare runs `npm run build` → new HTML is live.

## Routes

| URL | What |
|---|---|
| `/` | Homepage |
| `/journals`, `/destination-guides`, `/family-travel` | Article lists by `category` |
| `/journals/<slug>` | Every article (any category) |
| `/destinations`, `/destinations/<country>` | Generated from each article's `country` |
| `/about`, `/contact` | From `src/content/pages` |
| `/rss.xml`, `/sitemap-index.xml` | Feeds |
| `/admin` | The editor |

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` (editor at `/admin/index.html`) |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the build |
