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

The cleanest setup for an apex domain like `ntcreviewer.online` is to move its DNS to Cloudflare. Cloudflare Pages requires the apex domain to be a zone on the same Cloudflare account as the Pages project. The domain registration and renewal can stay at Hostinger.

#### 1. Add the domain to Cloudflare

1. In the Cloudflare dashboard, select **Add a site**.
2. Enter `ntcreviewer.online` and choose the **Free** plan.
3. Review the DNS records Cloudflare imports. Keep genuine records such as MX/TXT if you use Hostinger email. Remove Hostinger parking-page A/CNAME records if they are no longer needed.
4. Cloudflare gives you two nameservers, for example:
   - `ada.ns.cloudflare.com`
   - `bob.ns.cloudflare.com`

#### 2. Change nameservers at Hostinger

1. Open Hostinger **hPanel** → **Domains** → `ntcreviewer.online`.
2. Open **DNS / Nameservers** → **Change Nameservers**.
3. Choose the custom nameserver option and enter the two Cloudflare nameservers.
4. Save.

This moves DNS management to Cloudflare. Domain registration, renewal, and ownership stay with Hostinger. Allow up to 24 hours for propagation; Cloudflare will show the zone as **Active** and email you when it is ready.

#### 3. Attach the domain to Pages

1. Cloudflare dashboard → **Workers & Pages** → your Pages project.
2. Open **Custom domains** → **Set up a domain**.
3. Enter `ntcreviewer.online` → **Continue** → **Activate domain**.
4. Repeat for `www.ntcreviewer.online` if you want both to resolve.

Because the zone is now on Cloudflare, the required CNAME (flattened at the apex) is created automatically. Wait for the domain status to become **Active** and for the certificate to be issued.

#### 4. SSL/TLS

1. Cloudflare → **SSL/TLS** → **Overview** → set the mode to **Full (strict)**.
2. **Edge Certificates** → enable **Always Use HTTPS**.
3. Optionally enable **Automatic HTTPS Rewrites**.

#### 5. Redirect `www` to the apex (optional)

Pick one canonical address. To make `https://ntcreviewer.online` canonical:

1. Cloudflare → **Rules** → **Redirect Rules** → **Create rule**.
2. Use the **Redirect from WWW to root** template, or match:
   - **When incoming requests match:** `http.host eq "www.ntcreviewer.online"`
   - **Then redirect to:** `concat("https://ntcreviewer.online", http.request.uri.path)`
   - **Status code:** `301`
3. Save and deploy the rule.

Add both domains in Pages first, then apply the redirect. If you prefer `www` as canonical, reverse the direction.

#### If you keep Hostinger DNS

A `www` subdomain can be added as a CNAME pointing to your `<project>.pages.dev` address, but the apex `ntcreviewer.online` will not work reliably without Cloudflare DNS or a provider that supports CNAME flattening/ALIAS at the root. For a domain bought at Hostinger, moving the nameservers to Cloudflare is the simplest path to `https://ntcreviewer.online`.

#### Troubleshooting

- **Domain stuck on “Verifying”**: confirm the Cloudflare nameservers are saved at Hostinger and the zone is Active.
- **522 or 1014 error**: the Pages custom domain association is missing or the DNS record is wrong. Remove the domain in Pages, then re-add it.
- **Too many redirects**: check the SSL/TLS mode and make sure the `www` redirect does not loop.
- **Email stops working**: the nameserver change moves DNS to Cloudflare. Recreate the MX/TXT records Cloudflare imported, or add them manually.

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
- Navigating to another page mid-exam shows **Resume exam** in the header.
- **Reset exam** (exam header, between-element screen, or setup banner) clears the session after a confirmation.

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
