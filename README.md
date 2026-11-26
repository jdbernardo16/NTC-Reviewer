# NTC Reviewer

A free, static study companion for the Philippine amateur radio licensure exam — built for **Class D (Foundation)** and **Class C (Technician)** candidates.

- **Reviewer:** structured notes for Elements 2, 3, and 4, with tables, formulas, exam traps, and quick self-checks.
- **Mock exam:** 25 items per element, 40 minutes per element, question flagging, a question map, and per-element scoring.
- **Result:** pass/fail, 70% average and 50% per-element floor, Class D fallback notice, weak topics, full answer review, and a downloadable PDF.
- **No sign-in, no backend:** the pre-exam form only personalizes the result. Everything stays in the browser.

Live content is grounded in NTC Form 1-01 (rev. 03), MC 03-08-2012, MC 02-06-2019, and standard amateur radio practice. See `docs/research/ntc-amateur-exam-research.md` for the research brief and `app/pages/sources.vue` for the public source list.

## Stack

- Nuxt 4 + Vue 3 + TypeScript
- Tailwind CSS v4
- jsPDF (client-side result PDF)
- Self-hosted Archivo and JetBrains Mono via Fontsource
- No database, no API, no analytics

## Requirements

- Node.js 22 LTS or newer
- npm 10+

## Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build & preview

```bash
npm run generate
npm run preview
```

The static site is written to `.output/public`.

## Deploy

### Cloudflare Pages

- **Build command:** `npm run generate`
- **Output directory:** `.output/public`
- **Node version:** 22 (set `NODE_VERSION=22` if needed)

`public/_headers` adds basic security headers. Nuxt emits a `404.html`.

Full walkthrough, including the Git integration, Wrangler CLI, and an optional GitHub Actions workflow: [`docs/deploy-cloudflare.md`](docs/deploy-cloudflare.md).

### Hostinger shared hosting

1. Run `npm run generate`.
2. Upload the **contents** of `.output/public` to `public_html` (or the target subfolder).
3. Keep the generated `.htaccess` (included from `public/.htaccess`). It sets `404.html` as the error document and enables compression/caching where available.

Direct links work because every route is prerendered, not just the home page.

### Netlify / Vercel

Use the same build command and output directory. No server runtime is required.

## Project structure

```
app/
  assets/css/main.css        Tailwind v4 theme and base styles
  components/                Header, footer, lesson blocks, quick check
  data/
    elements.ts              Element and track metadata, exam constants
    lesson-types.ts          Lesson block schema
    lessons/                 Element 2, 3, 4 study content
    questions/               Original question bank (64 per element)
  pages/
    index.vue                Landing page
    reviewer/index.vue       Reviewer hub
    reviewer/[element].vue   Element study guide
    exam/index.vue           Pre-exam form and track selection
    exam/take.vue            Timed exam session
    exam/result.vue          Result, answer review, PDF download
    sources.vue              Sources, scope, privacy, disclaimers
  utils/
    exam.ts                  Session, scoring, storage
    pdf.ts                   A4 result PDF (jsPDF)
  error.vue                  404 page
docs/research/               Research brief
public/                      favicon, robots, _headers, .htaccess
```

## How the scoring works

- Each element is scored independently.
- **Class D:** pass with an Element 2 score of at least 70%.
- **Class C:** pass with a 70% average across Elements 2, 3, and 4 and no element below 50%.
- **Class C fallback:** if the Class C result fails but Element 2 is at least 50%, the result shows **Class D eligible**, following MC 03-08-2012 §IV.4.3.
- Scores are rounded to the nearest whole percent.

The 25-items/40-minutes format is a practice convention, not a figure stated in MC 03-08-2012. The UI labels it as a simulation.

## Editing content

### Questions

Edit `app/data/questions/element-2.ts`, `element-3.ts`, or `element-4.ts`. Each item needs:

```ts
{
  id: 'e2-99',
  element: 2,
  topic: 'Licensing',
  prompt: 'Question text?',
  choices: ['A', 'B', 'C', 'D'],
  answer: 0, // index in the source array
  explanation: 'Why the answer is correct.',
  ref: 'MC 03-08-2012 §II.8',
}
```

Choices are shuffled deterministically at module load (`app/data/questions/index.ts`), so you do not need to balance answer positions by hand. Do not add "all of the above" choices.

### Lessons

Edit the files in `app/data/lessons/`. Supported block types: `p`, `list`, `steps`, `table`, `formula`, `callout`, `terms`. See `app/data/lesson-types.ts`.

## Privacy

The site has no backend. The name, optional email, optional exam details, answers, and result are stored in `localStorage` under `ntc-reviewer:session:v1` and `ntc-reviewer:result:v1`. The PDF is generated in the browser. Clearing site data removes everything.

## Disclaimer

Independent study tool. Not affiliated with or endorsed by the National Telecommunications Commission, the Philippine Amateur Radio Association, or any amateur club. Mock results are practice estimates, not official ratings. Always verify requirements and band privileges with the NTC.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run generate` | Static production build to `.output/public` |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Vue/TypeScript type check |
| `npm run build` | Server build (not needed for static hosting) |
