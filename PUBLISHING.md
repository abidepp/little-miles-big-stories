# How to publish a new journal

A short guide to writing, saving and publishing articles on **Little Miles, Big Stories**. No code needed.

---

## 1. Log in

1. Go to **your-website-address/admin** (for now: `https://little-miles-big-stories.abinavdepp.workers.dev/admin`).
2. Click **Sign in with GitHub** and log in with your GitHub account.

> Bookmark this page. It's your writing desk.

## 2. Start a new article

1. In the left menu, click **Journals & Guides**.
2. Click **New Article**.
3. You'll see a form. Fill in what you have; only **Title** and **Publish date** are required.

| Field | What to put |
|---|---|
| **Title** | e.g. *Cappadocia, Turkey – Our Family Travel Experience & Complete Guide* |
| **Short summary** | One or two sentences. Shown on cards and in WhatsApp/Facebook previews. |
| **Section** | *Our Journals*, *Destination Guides* or *Family Travel* |
| **Feature on the homepage** | Tick it for your best stories (up to 3 are shown). |
| **Destination / Country** | e.g. *Cappadocia* / *Turkey*. Always spell the country the same way: it builds the country page. |
| **Cover photo** | Your best landscape photo of the trip. |
| **Trip at a glance** | When you went, trip length, who travelled, budget… Only the ones you fill in are shown. |

## 3. Write the article

The **Article** box already contains the section headings for a full journal:
*Why we chose it, Our story, What to expect with little ones, Things to see and do, Where we stayed, Getting around, Food, Preparing your little one, Our itinerary, What worked and what we'd do differently, Closing thoughts.*

- Write under each heading. **Delete any section you don't need.**
- **Headings:** select a line and choose *Heading 2* (main section) or *Heading 3* (e.g. *Day 1*). Main sections automatically appear in the "In this journal" contents list.
- **Photos:** click the **image** button in the toolbar, upload, and write a short description. Add as many as you like.
- **Links:** select some text and click the **link** button.
- **A quote:** use the quote button; it's shown large and centred.

## 4. Extras (all optional)

- **Budget breakdown:** click *Add Expense* for each line (*Flights – £620*). It becomes a neat table.
- **Closing photo & caption:** a family photo to end the story. The caption appears in handwriting.
- **Google Map:** in Google Maps, find the place → **Share** → **Embed a map** → **Copy HTML**, and paste it into the *Google Map* box.
- **Useful links:** hotels, tickets, tour companies.
- **Downloadable PDF guide:** upload a PDF and a *Download PDF* box appears at the end.

## 5. Save as a draft

Click **Save**. Your article is saved as a **draft**: it's safe, but not on the website yet. You can close the page and come back any time. Drafts are under **Workflow** in the top menu.

## 6. Publish

1. Open the draft and set its status to **Ready**.
2. Click **Publish → Publish now**.
3. Wait about **2 minutes** while the website rebuilds, then refresh the site.

Your article now appears automatically:
- on the **homepage** (latest entries, and featured if ticked)
- in its **section** (Our Journals / Destination Guides / Family Travel)
- on its **country page** (e.g. /destinations/turkey)
- at its own link, e.g. `/journals/cappadocia-turkey-our-family-travel-experience-complete-guide`

## 7. Share it

Open the article and use the **Share** buttons at the bottom: *Copy link* for your Instagram bio or Linktree, or WhatsApp, Facebook and Pinterest. On a phone, **Share** opens your phone's share menu, including Instagram.

## Updating an article later

Open it from **Journals & Guides**, make changes, **Save**, then **Publish** again. The link stays the same.

## Editing the homepage, About or Contact

In the left menu, open **Site page: Homepage**, **Site page: About Us** or **Site page: Contact & social links**. Here you can change the hero photo, introduction, family photo, Instagram link and email address. Save and publish the same way.

---

### If something goes wrong

If an article doesn't appear after 5 minutes, the website probably rejected it, for example because of a broken photo. The live site keeps showing the previous version, so nothing breaks for visitors. Ask Abinav to check the Cloudflare build log; the error names the article and field.

---

## One-time setup (for Abinav)

The editor commits to the GitHub repo, and Cloudflare rebuilds the site on every push to `main`.

1. **Cloudflare auto-deploy:** in Cloudflare → Workers & Pages → this Worker → *Settings → Builds*, make sure the GitHub repo is connected, with build command `npm run build` and deploy command `npx wrangler deploy`.
2. **Quick test login:** open `/admin`, choose **Sign in with token**, and paste a fine-grained GitHub token for this repo with *Contents: read & write* and *Pull requests: read & write*.
3. **"Sign in with GitHub" for the family** ([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)):
   1. Deploy the auth Worker with its *Deploy to Cloudflare* button.
   2. Create a GitHub App, using the pre-filled link in that README. Set the callback URL to `https://<auth-worker-url>/callback`, create a client secret, and install the app on this repo only.
   3. In the auth Worker's settings, add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (as a secret) and `ALLOWED_DOMAINS` (your site's domain).
   4. In `public/admin/config.yml`, uncomment `base_url:` and paste the auth Worker URL.
4. **Give each family member access:** they need a free GitHub account, added under the repo's *Settings → Collaborators*.
5. **Custom domain:** add `littlemilesbigstories.com` under the Worker's *Settings → Domains & Routes*. Then update `site` in `astro.config.mjs`, `site_url`/`display_url` in `public/admin/config.yml`, and `Sitemap:` in `public/robots.txt`, and add the domain to the auth Worker's `ALLOWED_DOMAINS`.
