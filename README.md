# Little Miles, Big Stories

A family travel journal by Ish. Static [Astro](https://docs.astro.build) site on Cloudflare Workers.
Spec: the *Website Build Guide* (Nov 2026). Editing content: [PUBLISHING.md](PUBLISHING.md).

## How it fits together

```text
src/content/pages/<page>/index.md      all page text & photos (site, home, our-story, journals, contact)
src/content/journals/<slug>/index.md   one folder per journal (+ cover photo); PDFs go in public/journals
src/content.config.ts                  schemas: what fields each file must have
public/admin/config.yml                the editor's forms (must match the schemas)
src/utils/content.ts                   getSingle(), getJournals(), hasPage()
src/layouts/SiteLayout.astro           header, footer, fonts, <head>
src/styles/global.css                  colours, fonts, spacing as CSS variables
src/components/                        Photo, JournalCard, Icon, ShareButtons
src/pages/                             index, our-story, journals/, contact, 404, rss.xml
```

Edit in `/admin` → commit to GitHub → Cloudflare runs `npm run build` → live in ~2 minutes.

**Add a page later** (e.g. "Our work"): create `src/pages/our-work.astro` using `SiteLayout`, then add it to `navLinks` in the layout.
**Add a journal:** a new folder in `src/content/journals` (or Journals → New in the editor).

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` (editor at `/admin/index.html`) |
| `npm run build` | Build to `./dist/` |
| `npx wrangler deploy` | Deploy `./dist` (Workers Builds does this on every push) |
