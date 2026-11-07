# GRANTLY implementation changelog

## Engineering improvement pass — archive-based update

- Extracted scholarship, application and profile types into feature modules.
- Moved illustrative scholarship/application seed data and explainable matching logic out of the root app module.
- Extracted guarded localStorage JSON helpers and shared currency/deadline formatting utilities.
- Deferred the Fuse.js query with React `useDeferredValue` to reduce immediate search work during typing.
- Removed unused component state declarations.
- Added keyboard skip navigation and accessible names/state for mobile navigation and the scholarship detail close control.
- Added narrow-phone layout hardening and key container min-width safeguards.
- Added engineering audit and dedicated architecture, responsive design, performance, accessibility, testing, frontend-only and final-report documentation.

## Verification limitations

The supplied ZIP does not contain a usable dependency installation or package lockfile. The baseline build was attempted and failed on unresolved dependencies. `npm install --ignore-scripts --no-audit --no-fund` timed out. Consequently, no successful post-change build, automated test, browser viewport validation, Lighthouse score, Git commit or remote push is claimed. See `docs/INITIAL-AUDIT.md` and `docs/FINAL-ENGINEERING-REPORT.md`.

## Preserved product behavior

The dashboard, scholarship catalogue, search/filter behavior, save actions, application tracking, profile matching, local document checklist, insights, mobile navigation, command palette and local persistence remain in the application. Sample scholarship records and all associated eligibility/deadline information remain illustrative demo data.

## Frontend-only boundary

No backend, API, authentication service, cloud database, remote AI model or secure document upload service was introduced.


## Submission hardening pass

- Added keyboard focus containment and focus restoration to both modal surfaces.
- Added a repository `.gitignore` for dependencies, build output, environment files and generated artifacts.
- Updated accessibility and engineering reports to describe the focus-management work and the dependency/build verification limitation accurately.


## Visual refresh pass
- Reworked the visual theme toward a deep teal/emerald education-finance identity.
- Updated the sidebar, navigation states, dashboard hero, buttons, statistics, cards, tags, progress indicators, profile surfaces and focus styling.
- Added a stronger card elevation/border system while retaining the existing page structure and interactions.


## Engineering pass — November 2026

- Extracted reusable shared statistics and scholarship opportunity card components.
- Added an explicit `ApplicationStatus` union and typed the seed application records.
- Added explainable match-signal summaries to opportunity details. Eligibility criteria are now framed as items users must verify, not confirmed facts.
- Added progressbar semantics to the match visualization.
- Added mobile navigation backdrop dismissal, Escape handling, body scroll lock, touch-size safeguards and safe-area spacing.
- Removed eager scroll/tilt animation dependencies; confetti now loads on demand and is skipped for reduced-motion users.
- Fixed division-by-zero behavior in the application pipeline when no applications exist.
- Added an accessible label to scholarship and command-menu search fields.

**Validation:** all 10 TS/TSX files passed TypeScript syntax transpilation; strict type-checking passed for the domain/data/matching/storage modules. Full build and browser QA remain unverified because package installation timed out in this environment.
