# Deploying to Cloudflare Pages

This is a fully static Nuxt site. Cloudflare Pages is a good fit: no server, no database, no environment variables.

**Build command:** `npm run generate`
**Output directory:** `.output/public`
**Node version:** 22 (set `NODE_VERSION=22` if the build image defaults to an older Node)

You can deploy either by connecting the GitHub repo (recommended) or by uploading the built folder with Wrangler.

---

## Option A — Connect the GitHub repo (recommended)

1. Push the project to GitHub (the repo is `jdbernardo16/NTC-Reviewer`).
2. Open the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select `jdbernardo16/NTC-Reviewer`.
4. Use these build settings:
   - **Framework preset:** None (or Nuxt, if offered — the commands below take precedence)
   - **Build command:** `npm run generate`
   - **Build output directory:** `.output/public`
   - **Root directory:** `/` (leave blank)
5. Add an environment variable if the build image is older than Node 22:
   - `NODE_VERSION` = `22`
6. Click **Save and Deploy**.

Every push to the production branch redeploys. Pull requests get preview URLs automatically.

### Custom domain

1. In the Pages project → **Custom domains** → **Set up a domain**.
2. If the domain is already on Cloudflare, the DNS record is created automatically.
3. If it is on another registrar, add the CNAME that Cloudflare shows you.

HTTPS is provisioned automatically. No redirect rules are needed for the app routes because Nuxt prerenders every route to its own `index.html`.

### What about `_headers`?

`public/_headers` is copied into the build and Cloudflare applies it automatically. It adds:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- a restrictive `Permissions-Policy`

You do not need to configure these in the dashboard.

---

## Option B — Build locally and deploy with Wrangler

Use this if you do not want Cloudflare to run the build.

```bash
npm ci
npm run generate
npx wrangler pages deploy .output/public --project-name ntc-reviewer
```

The first run asks you to log in to Cloudflare. You can also create an API token and set:

```bash
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

Then run the deploy command again. Use the actual Pages project name in place of `ntc-reviewer` if you chose a different one.

### Deploy from a fresh clone

```bash
git clone https://github.com/jdbernardo16/NTC-Reviewer.git
cd NTC-Reviewer
npm ci
npm run generate
npx wrangler pages deploy .output/public --project-name ntc-reviewer
```

---

## Option C — GitHub Actions (optional)

If you want CI deploys, add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run generate
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy .output/public --project-name=ntc-reviewer
```

Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the GitHub repo → **Settings** → **Secrets and variables** → **Actions**. The token needs the **Cloudflare Pages: Edit** permission.

Do not add this workflow until the secrets exist, or the first push will show a failed action.

---

## Verify the deployment

After the first deploy, check:

- `/` loads the landing page.
- `/reviewer/element-2` loads directly (not just through client-side navigation).
- `/exam` accepts the form and starts a session.
- Submitting an exam reaches `/exam/result` and the PDF button downloads a file.
- Refreshing `/exam/take` while a session is active resumes the exam.

The app has no server routes, so there is nothing to configure in Functions or KV.

---

## Troubleshooting

**Build fails on `npm run generate` in Cloudflare**
- Set `NODE_VERSION=22`.
- Confirm the build command and output directory are exactly `npm run generate` and `.output/public`.
- Clear the build cache and retry.

**A direct URL returns 404**
- The output directory is probably wrong. It must be `.output/public`, not `.output` or `dist`.
- Nuxt prerenders `/`, `/reviewer`, `/reviewer/element-2`, `/reviewer/element-3`, `/reviewer/element-4`, `/exam`, `/exam/take`, `/exam/result`, and `/sources`. Check `.output/public` after a local build.

**Old version still shows**
- Cloudflare caches hashed assets aggressively. Purge the cache in the dashboard, or use a hard refresh.
- The HTML itself should not be cached long-term; if you added custom cache rules, exclude HTML.

**PDF does not download**
- The PDF is generated client-side with jsPDF. Check the browser console for an error.
- Some in-app browsers block downloads. Open the site in Safari, Chrome, or Firefox directly.

**Fonts look wrong**
- Archivo and JetBrains Mono are bundled through Fontsource and served from `/_nuxt/`. If your custom CSP blocks `/_nuxt/`, allow it.

---

## Cost

Cloudflare Pages has a free tier that is more than enough for this site: static requests, unlimited bandwidth, and 500 builds per month. No paid Workers, KV, or D1 resources are used.
