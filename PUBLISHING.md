# How to update Little Miles, Big Stories

Everything on the site (every heading, paragraph, photo and journal) is edited in the **editor**. No code needed.

## 1. Log in

1. Go to **your-website/admin** (for now: `https://little-miles-big-stories.abinavdepp.workers.dev/admin/`).
2. Sign in. See "One-time setup" below for the first time.

Bookmark it.

## 2. What's in the editor

| Section | What it changes |
|---|---|
| **Journals** | The journal cards on the Journals page |
| **Settings** | Site title, tagline, footer line, Instagram, email, contact form key |
| **Page: Home** | Your photo, the handwritten note, heading, paragraphs, quote, banner |
| **Page: Our story** | The seven sections, the cards and the places list |
| **Page: Journals** | The text above the journal cards |
| **Page: Contact** | Heading, text, privacy note |

Anything in [square brackets], like **[PARTNER]** or **[YOUR EMAIL]**, is still to be filled in.

## 3. Add a new journal (e.g. London)

1. **Journals → New Journal**
2. Fill in:
   - **Title:** *London at Christmas*
   - **Status:** *Out now*, *Coming soon* (small card), or *Draft* (hidden)
   - **Position:** *1* shows first
   - **Tags:** *Journal 02*, *UK · 3 days*, *With a 5-year-old*
   - **Card text**, **Cover photo**, **Photo description**
   - **PDF journal:** upload the PDF. The "Download the PDF" button switches on by itself.
3. **Save.** It's now a draft and not on the site yet.

To turn the existing "Coming soon: London at Christmas" card into the real journal, open it, set **Status** to *Out now* and upload the PDF.

## 4. Publish

1. Open **Workflow** (top menu), move the item to **Ready**, then click **Publish**.
2. Wait about **2 minutes**, then refresh the site.

Editing works the same way: open it, change it, **Save**, **Publish**.

## Later: a full journal page

Each journal has an optional **Full journal** box. Leave it empty for now. When you write the whole story there (with headings and photos), the journal automatically gets its own page, e.g. `/journals/cappadocia`, and its card gets a "Read the journal" link.

## If something doesn't appear

After 5 minutes, check Cloudflare → Workers & Pages → the Worker → **Deployments**. If the build failed, the log names the file and field (often a photo). The live site keeps the previous version, so visitors never see a broken page.

---

## One-time setup (for Abinav)

1. **Auto-deploy:** Cloudflare → the Worker → *Settings → Builds*. Make sure the GitHub repo is connected, with build command `npm run build` and deploy command `npx wrangler deploy`.
2. **Quick login (token):** create a GitHub fine-grained token for this repo with *Contents* and *Pull requests* set to read and write. At `/admin`, choose **Sign in with token**.
3. **"Sign in with GitHub" for Ish:** follow [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth).
   1. Deploy the auth Worker.
   2. Create a GitHub App with callback `https://<auth-worker>/callback` and install it on this repo.
   3. In the auth Worker, set `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `ALLOWED_DOMAINS`.
   4. Uncomment `base_url` in `public/admin/config.yml`.
   5. Add Ish's GitHub account as a repo collaborator.
4. **Contact form:**
   1. At [web3forms.com](https://web3forms.com), enter Ish's email to get a free access key.
   2. Paste it into **Settings → Contact form key**.
   3. Send a test message.
5. **Domain:** add `littlemilesbigstories.com` (and `www`) under the Worker's *Domains & Routes*. Then update:
   - `site` in `astro.config.mjs`
   - `site_url` and `display_url` in `public/admin/config.yml`
   - `Sitemap` in `public/robots.txt`
6. **Analytics:** Cloudflare → *Web Analytics* → add the domain.
