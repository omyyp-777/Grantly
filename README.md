# GRANTLY — Scholarship Command Center

A polished, responsive, frontend-only scholarship discovery and management experience built for the GRANTLY challenge.

## Stack
- React + Vite + TypeScript
- Framer Motion for page and card transitions
- Lucide React for consistent iconography
- Fuse.js for fuzzy scholarship search
- date-fns for deadline calculations
- Sonner for toast infrastructure

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Premium UI upgrades
- Animated hero glow, orbit rings, floating opportunity callouts and subtle spark effects
- Refined glass-like sticky header and layered page background
- Hover lift, gradient reveal and micro-interactions on cards, stats and controls
- Keyboard command palette: press `Ctrl + K` (Windows/Linux) or `⌘ + K` (Mac), then choose a destination; press `Esc` to close
- Sonner feedback when saving scholarships, updating document readiness and adding an application
- Dialog and mobile-drawer scroll locking, with backdrop dismissal and Escape-key support
- Reduced-motion support via `prefers-reduced-motion`; smooth scrolling is disabled for these users
- Dialog semantics (`role="dialog"`, `aria-modal`, labelled opportunity detail) and visible keyboard focus states
- Visible focus states and mobile-specific command palette sizing

## Features
- Student dashboard and opportunity radar
- Scholarship discovery with fuzzy search and category filters
- Match indicators and opportunity detail modal
- Save / unsave scholarships
- Application tracker with editable stages
- Student Scholarship Passport
- Browser-local document readiness checklist
- Funding and pipeline insights
- Responsive desktop, tablet and mobile layouts

## Frontend-only boundary
No backend, server API, authentication service, or cloud database is used. User interactions persist in the browser using `localStorage`. This is a demo experience; data does not sync across devices or users. The document vault is a checklist only and does not upload sensitive files.

## Important demo-data note
Scholarship names, providers, awards, eligibility criteria, match scores and dates are illustrative sample content. Verify all details with official scholarship providers before relying on them. Match percentages are demo indicators, not a guarantee of eligibility or funding.

## Keyboard shortcuts
- `Ctrl + K` / `⌘ + K`: open or close the quick navigation menu
- `Esc`: close the active modal or command menu

## Suggested deployment
Import this repository into Vercel or Netlify and use the default Vite build settings:
- Build command: `npm run build`
- Output directory: `dist`

## Before submission
- Replace demo records with verified opportunities if required by the event.
- Test all interactions in the deployed build.
- Check keyboard navigation, contrast and mobile layouts.
- Run a Lighthouse audit and test with a keyboard and a screen reader; aim for strong Core Web Vitals and no serious accessibility violations.
- Add your own project screenshots and a short demo video to the repository.

## Premium interaction libraries

The interface uses a small set of purpose-driven motion libraries:

- **Lenis** — smooth, interruptible page scrolling; disabled for reduced-motion preferences.
- **GSAP + ScrollTrigger** — restrained one-time reveal animations as content enters the viewport.
- **React Parallax Tilt** — subtle pointer-driven depth on scholarship cards; disabled as a visual effect on touch layouts.
- **canvas-confetti** — celebratory feedback when an application is moved to Approved.
- **Framer Motion** — page transitions, dialogs, and layout transitions.

Install the added dependencies with `npm install`, then run `npm run build` before deployment. All motion respects `prefers-reduced-motion`; the experience remains usable without relying on animation.

## v2.0 improvement pass

See [IMPLEMENTATION-CHANGELOG.md](./IMPLEMENTATION-CHANGELOG.md) for the implemented requirements and frontend-only boundaries. The Scholarship Passport now has editable profile fields and a live completeness metric; indicative scholarship matches recalculate from profile and displayed eligibility text; and applications can be removed from the tracker. Responsive and keyboard-focus styling has also been strengthened.

**Important:** scholarship listings and eligibility descriptions remain illustrative demo content. Match percentages are heuristic guidance only, not official eligibility decisions. The document vault is a browser-persisted checklist, not secure file storage.


## Engineering documentation

See [`docs/INITIAL-AUDIT.md`](./docs/INITIAL-AUDIT.md) for the archive-based audit and baseline verification, and [`docs/FINAL-ENGINEERING-REPORT.md`](./docs/FINAL-ENGINEERING-REPORT.md) for the exact scope and outstanding validation. Architecture, responsive design, performance, accessibility, testing and frontend-only boundaries are documented separately under `docs/`.

**Validation note:** the supplied source archive did not include installed dependencies or a lockfile. The baseline build was attempted but could not resolve dependencies; dependency installation timed out. Do not treat a production build, automated test run, Lighthouse result or full viewport matrix as verified until those checks are completed in an installed environment.

## Engineering validation

The source archive update includes isolated TypeScript checks and matching/profile smoke checks. The complete Vite production build and browser-based QA remain pending because the supplied archive has no installed dependencies and dependency installation could not complete in the execution environment. See `docs/FINAL-ENGINEERING-REPORT.md` for exact verification status.

## Submission quickstart

See [docs/SUBMISSION-QUICKSTART.md](docs/SUBMISSION-QUICKSTART.md) for run instructions, demo limitations and a final release checklist.


## Latest visual refresh
The interface uses a deep teal and emerald palette with a darker navigation rail, refreshed dashboard hero, updated card surfaces, clearer active states and more visible keyboard focus. The mobile navigation now has a dismissible backdrop, Escape-key handling and body-scroll locking. Reusable scholarship and statistic cards are extracted into feature/shared component modules. Scholarship detail views explain which profile signals influence the indicative match and clearly label eligibility text as criteria to verify.


## Latest engineering pass

- Extracted reusable `StatCard` and scholarship-card components from the root application module.
- Added a typed application-status union and typed initial application fixtures.
- Added human-readable match signals to scholarship details; eligibility requirements are presented as items to verify rather than falsely marked as satisfied.
- Added an accessible progressbar value to each match indicator.
- Improved mobile drawer dismissal, touch target sizing, safe-area padding and overlay scroll locking.
- Removed eager Lenis, GSAP and pointer-tilt dependencies. Approval confetti is now a dynamic import and respects reduced-motion preferences.
- Corrected the empty-application pipeline calculation to avoid invalid percentage widths.

**Verification in this workspace:** TypeScript syntax transpilation passed for all 10 TS/TSX source files. Strict type-checking passed for the domain types, scholarship data/matching and storage modules. A complete Vite production build and browser/Lighthouse QA could not be completed because dependencies are not installed and package installation timed out. Do not interpret the source checks as a successful production build or a guaranteed judging score.
