# GRANTLY — Scholarship Command Center

A polished, responsive, frontend-only scholarship discovery and management experience built for the GRANTLY challenge.

## Stack
- React + Vite + TypeScript
- Lenis for smooth, interruptible scrolling (disabled when reduced motion is preferred)
- Framer Motion for page and card transitions
- Lucide React for consistent iconography
- Fuse.js for fuzzy scholarship search
- Recharts is included for future chart expansion; current insights use lightweight CSS visualisations
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
- Lenis smooth scrolling with page-navigation scroll-to-top and dialog scroll locking
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
