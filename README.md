# Portfolio 2025 Scaffold

Static-ready Next.js 15 + TypeScript scaffold for Sarah Riazati’s 2025 portfolio. The build renders all content from JSON files, wires Netlify-ready contact forms, and keeps styling intentionally minimal (Helvetica + CSS Modules).

## Tech Stack
- Next.js 15 (App Router, static export)
- TypeScript with strict mode
- CSS Modules + small global reset
- `react-player` for Vimeo/YouTube embeds
- JSON content stored in `/content`

## Project Structure
```
/app                 # Route groups and pages (app router)
/components         # Reusable TSX components
/content            # JSON files for all site data
/lib                # File-system helpers for loading JSON
/public             # Favicon, placeholders, logo assets
/styles             # CSS Modules per component/page
/types              # TypeScript interfaces per schema
```

## Working with Content
All page copy, media paths, and SEO metadata live in `/content`:
- `home.json` – hero copy + SEO for `/`
- `video-index.json` – intro + SEO for `/video-and-animation`
- `video-projects/*.json` – one file per project, used for dynamic routes
- `web-dev-design.json` – statement, skills, and logos
- `courses/index.json` – overview + list of course slugs
- `courses/entries/*.json` – full details for each class
- `site.json` – contact info, social links, site metadata

Every schema has a matching interface under `/types`. When you update JSON, keep fields aligned with their interface to preserve type safety.

### Adding or Editing Projects
1. Duplicate any file in `content/video-projects` and update the placeholder data.
2. Ensure the filename matches the `slug` (e.g., `monumental.json`).
3. Add still image filenames to `/public/placeholders` if you reference new assets.
4. The route `/video-and-animation/[slug]` will be generated automatically.

### Updating Courses
- Edit `content/courses/index.json` to control order/intro copy.
- Update individual course files in `content/courses/entries` for objectives, screenings, and assignments.

### Contact + Social
- Update `site.json` to change the email, availability statement, or social links used on the home page, header, and footer.

## Commands
```bash
npm install        # install dependencies
npm run dev        # start local dev server on http://localhost:3000
npm run lint       # run ESLint against the project
npm run build      # production build (static-ready)
npm run export     # runs next build; output:"export" drops static files in ./out
```

## Static Export & Deployment
1. Run `npm run export`. With `output: "export"` enabled, `next build` writes fully static assets to `/out` (no separate `next export` step is required in Next 15).
2. Preview locally by serving `/out` with any static server (e.g., `npx serve out`).
3. Deploy to Netlify by dragging the `/out` folder into the web UI **or** by pointing a Netlify site at this repo with the build command `npm run export` and publish directory `out`.
4. The Netlify form is already configured with `name="contact"` and `data-netlify="true"`; no additional server code is required.

## Editing Styles & Components
- Shared UI lives in `/components` with corresponding CSS Modules inside `/styles`.
- Global typography/layout primitives are in `app/globals.css`.
- When adding new components, keep styles scoped via CSS Modules and stick to the established minimalist palette.

## Notes
- The project sets `next.config.ts` to `output: "export"` and `images.unoptimized = true` to guarantee compatibility with static hosting.
- All media paths in JSON should point to files inside `/public` so they work in static builds.
- `react-player` is dynamically imported client-side to avoid SSR issues with video embeds.
