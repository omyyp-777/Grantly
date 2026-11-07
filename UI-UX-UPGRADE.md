# GRANTLY UI/UX upgrade

## Added libraries
- GSAP + ScrollTrigger: one-time viewport reveal animations for cards and panels.
- React Parallax Tilt: restrained pointer tilt on scholarship opportunity cards.
- canvas-confetti: celebratory effect and toast when an application status becomes Approved.

## Existing libraries retained
- Lenis for smooth scrolling.
- Framer Motion for page/dialog transitions and layout changes.
- Fuse.js for fuzzy discovery search.
- Recharts for analytics visualizations.
- Sonner for interaction feedback.
- Lucide React for consistent iconography.

## Accessibility and performance safeguards
- All new motion checks `prefers-reduced-motion`.
- Parallax tilt is visually disabled on touch/small-screen layouts.
- Scroll reveal animations are one-time and use transform/opacity.
- No remote APIs or backend services were introduced; application state remains browser-local.

## Local verification
Package installation could not be completed in the authoring environment because the package download timed out. Run `npm install`, `npm run build`, and `npm run dev` locally. Check the browser console and test reduced-motion, keyboard focus, touch layouts, scholarship actions, and application status changes before deployment.
