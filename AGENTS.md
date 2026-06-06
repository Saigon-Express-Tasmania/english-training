<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Page cloning workflow

Use this guide when cloning an external HTML/Tailwind template page (e.g. a ThemeForest or static demo) into this project.

## Project conventions

| Concern | Location |
|---------|----------|
| Page UI | `src/views/<page-name>/` — one folder per page (`index.tsx`, `index.css`, `sections/`, `components/`) |
| Route wiring | `src/app/[locale]/<route>/page.tsx` — thin wrapper that imports the view |
| Shared images | `src/assets/images/` + barrel `src/assets/images.ts` (static imports for `next/image`) |
| Repeatable content | `src/assets/data/<page>.ts` |
| Template CSS (shared) | `src/app/globals.css` |
| Page-specific CSS | `src/views/<page-name>/index.css` |
| i18n | `messages/en.json`, `messages/vi.json`; locale-aware links via `@/i18n/navigation` |
| Locales | `en` (default), `vi` — routes are prefixed: `/en/...`, `/vi/...` |

Do **not** put cloned page markup directly in `src/app/`. Keep app routes minimal.

## Step 1 — Fetch and inspect the source page

1. Download the demo HTML and CSS:
   - `index.html` → inspect structure
   - `css/app.min.css` (or equivalent compiled Tailwind bundle)
2. List all image paths (`src="images/..."`) and download them into `src/assets/images/` preserving subfolders (`logo/`, `thumbs/`, `shapes/`, etc.).
3. Also download any images referenced only in CSS `url(../images/...)` (backgrounds, etc.).
4. Identify sections (`<header>`, `<section class="banner">`, footer, etc.) and repeated data (courses, nav items, testimonials).

Helper scripts live in `scripts/` (`download-images.mjs`, `extract-sections.mjs`, etc.) — reuse or adapt them for new pages.

## Step 2 — CSS

1. Copy the template's compiled CSS into `src/app/globals.css` (it usually includes Tailwind v4, custom theme tokens, component classes, Animate.css, AOS CSS, and Select2 overrides).
2. Fix asset paths: replace `url(../images/` with `url(../assets/images/` so Next.js resolves them from `src/app/globals.css`.
3. Fix broken bundled paths (e.g. slick-carousel `url(../imagesnode_modules/...)`) — remove or replace with `none`.
4. Put page-only layout fixes (carousel, dropdown positioning) in `src/views/<page>/index.css`.

## Step 3 — Build the React view

Create `src/views/<page>/` with:

```
index.tsx          # composes sections + HomeShell-style wrapper
index.css          # page-specific overrides
edu-image.tsx      # thin next/image wrapper (uses src.width / src.height)
sections/          # one file per template section
components/        # shared client widgets (carousels, shell, etc.)
```

### Markup rules

- Preserve **English text exactly** unless the user asks to translate.
- Convert `class` → `className`, self-close tags, `tabindex` → `tabIndex`.
- Replace every `<img>` with `EduImage` / `next/image` and static imports from `@/assets/images`.
- Keep original CSS class names — styling depends on them.
- Extract lists/cards into `@/assets/data/<page>.ts` and map in JSX.

### Wire the route

```tsx
// src/app/[locale]/<route>/page.tsx
import PageView from "@/views/<page>";

export default function Page() {
  return <PageView />;
}
```

## Step 4 — JavaScript replacements (Next.js friendly)

Do **not** import the template's jQuery bundle. Replace plugins with React/client modules:

| Template | Replacement in this project |
|----------|----------------------------|
| Slick slider | `embla-carousel-react` + `embla-carousel-autoplay` — see `components/edu-carousel.tsx` |
| AOS | `aos` package + `ScrollAnimations` in `home-shell.tsx` (`offset: 40`, `duration: 1000`) |
| WOW.js | `wow.js` — initialized alongside AOS; keep `wow bounceIn` classes |
| CounterUp | `CounterValue` + `IntersectionObserver` |
| Select2 | **Do not use** — jQuery Select2 breaks under Turbopack. Use a React dropdown that reuses template `.select2-*` CSS classes — see `components/category-select.tsx` |
| Bootstrap tabs | React `useState` for active tab |
| Mobile menu | React state in `home-shell.tsx` + `useHomeUi()` |
| Fixed header / scroll-to-top | `useEffect` scroll listener in `home-shell.tsx` |
| Phosphor icons | `@phosphor-icons/web` — import `regular`, `bold`, `fill` in `[locale]/layout.tsx` |

Mark interactive sections with `"use client"`. Keep static sections as server components when possible.

## Step 5 — Client shell pattern

Wrap the page in a client shell (see `components/home-shell.tsx`):

- Preloader hide on `window.load`
- `.header.fixed-header` toggle at scroll ≥ 260px
- Scroll-to-top `.progress-wrap` with SVG stroke offset
- Mobile menu + overlay (`show-overlay` / `show` classes)
- `ScrollAnimations` mounted after preloader

## Step 6 — Verify

```bash
npm run build
```

Fix TypeScript errors (e.g. `"use client"` on components using hooks). Clean `.next` if stale route types appear after moving pages under `[locale]/`.

## Reference: home page clone

The home page was cloned from [EduAll demo](https://wowtheme7.com/tailwind/eduall/demo/index.html):

- View: `src/views/home/`
- Data: `src/assets/data/home.ts`
- Route: `src/app/[locale]/page.tsx`

## i18n (when translating later)

- Add keys to `messages/en.json` and `messages/vi.json`.
- Server: `getTranslations()` from `next-intl/server`.
- Client: `useTranslations()`.
- Links: `import { Link } from "@/i18n/navigation"` (not `next/link`).
- Do not translate until explicitly requested.

## Prompt template for future clones

```
Fetch <URL> and clone it to src/views/<name>.
- Common CSS in src/app/globals.css
- Images and data in src/assets
- Use Next Image instead of img
- Keep English text intact
- Wire route at src/app/[locale]/<route>/page.tsx
- Replace jQuery plugins with Next-friendly equivalents (see AGENTS.md)
```
