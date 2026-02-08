# DocUtilityHub (Free, Ad-Monetized, No-Login)

A modular document utility platform inspired by iLovePDF, focused on high-intent niche workflows.

## Features

- 4 tool categories with SEO-friendly URLs for each tool page
- Reusable tool page template (header, description, upload, action, output, FAQ, ad slots)
- Basic rate limiting and secure headers
- Stateless processing with temporary file uploads and auto-delete
- Privacy policy and sitemap for trust + SEO
- Example fully implemented tool: **Summarize PDF in 5 bullets**

## Project structure

```text
src/
  config/tools.js           # all categories + tool metadata + SEO fields
  routes/toolRoutes.js      # generic routes + per-tool processing path
  services/summarizer.js    # sample processing logic for one tool
  utils/file.js             # auto-delete helper
  server.js                 # app bootstrap, middleware, security, rate limit
views/
  partials/header.ejs
  partials/footer.ejs
  home.ejs
  tool.ejs
  privacy.ejs
  404.ejs
public/css/styles.css
uploads/                    # temp upload directory
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Add a new tool

1. Add a tool entry in `src/config/tools.js` under the right category:
   - `slug`, `title`, `description`
   - Optional SEO fields: `metaTitle`, `h1`, `faq`
2. Add processing logic inside `POST /tools/:slug/process` in `src/routes/toolRoutes.js`:
   - Branch by `tool.slug`
   - Parse input file
   - Return `result: { title, items }`
3. Keep logic stateless and ensure uploaded file is deleted in `finally`.
4. Test page at `/tools/<slug>` and processing endpoint.

## Ad slots

Placeholders are included and can be swapped with:
- Google AdSense script blocks
- Native display banners
- Affiliate blocks

Current slots:
- below tool description
- after output
- footer optional slot

## Deployment

Works on any Node.js host (Render, Railway, Fly.io, VPS):

- Build: `npm install`
- Start: `npm start`
- Set `PORT` if needed.

No persistent storage required.
