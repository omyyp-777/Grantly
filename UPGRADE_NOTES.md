# GRANTLY UI Upgrade Notes

This update adds a premium interaction layer while preserving the frontend-only architecture.

## What changed
- Added an animated hero treatment: ambient glow, orbital rings, floating callouts and spark accents.
- Added refined card/stat hover states, gradient reveals, glass-like navigation and focus-visible styling.
- Added a global quick-navigation command palette (`Ctrl+K` / `⌘K`, `Esc` to close).
- Added Sonner toast feedback for saving/unsaving opportunities, adding applications and marking checklist items ready.
- Integrated Lenis smooth scrolling with a reduced-motion opt-out, page-navigation scroll-to-top and scroll locking behind dialogs.
- Added semantic dialog roles and labels for assistive technology.
- Made localStorage writes resilient to unavailable or full browser storage.
- Kept localStorage persistence and all existing product flows.

## Quality checklist alignment
- Problem alignment: scholarship discovery, saved opportunities, application stages, student passport, document checklist and insights remain the product focus.
- Functionality: local persistence and interactive flows are retained; storage failures now show feedback.
- UI/UX: responsive layouts, smooth scrolling, page transitions and feedback states.
- Code/architecture: strict TypeScript configuration, modular page sections and typed scholarship/application models.
- Performance/accessibility: reduced-motion opt-out, lightweight Lenis setup, keyboard focus styling and semantic dialogs.
- Innovation: opportunity radar, explainable demo match indicators and command palette.
- Documentation: setup, build, frontend-only boundaries and demo-data caveats documented.

These are implementation targets, not a claim of a particular automated audit score.

## Scope
No backend, authentication provider, API or remote database was introduced. The app continues to use illustrative scholarship data and browser-local state.
