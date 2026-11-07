# Testing and Quality Assurance

## Supplied test infrastructure

The provided archive contains no unit, integration or end-to-end test files and no test runner script in `package.json`. No new testing dependency was added because package installation could not be completed in this environment.

## Baseline result

`npm run build` was attempted before source changes and failed because the archive did not include installed React/Vite/application dependencies. A subsequent `npm install --ignore-scripts --no-audit --no-fund` attempt timed out. This is an environment/dependency availability blocker, not evidence of a successful or failed application runtime.

## Checks that were possible here

- Isolated strict TypeScript type-check passed for scholarship/application types, seed data, matching logic and storage helpers.
- TypeScript syntax transpilation passed for the app entry points and all new modules.
- Node assertion smoke checks passed for profile completeness, match-score bounds and the effect of a study-level mismatch.
- CSS brace balance check passed.

These are targeted checks, not a substitute for the full application build or browser tests.

## Final verification attempt

A final `tsc -b` attempt also stopped on unresolved application dependencies (React, Vite and the declared UI/runtime packages). The large JSX and implicit-`any` diagnostic cascade is not a reliable measure of source correctness until those declarations are installed.

## Required checks after dependency installation

1. `npm run build` — TypeScript project build and Vite production bundle.
2. Unit tests for `calculateMatch`, `profileCompleteness`, storage fallback behavior, search/filter behavior and status transitions.
3. Component tests for saving opportunities, updating/removing applications, editing the Passport and checklist persistence.
4. Browser tests for all primary navigation flows, keyboard command palette, dialogs and mobile navigation.
5. Responsive checks at 320, 360, 375, 390, 430, 640, 768, 820, 1024, 1280, 1440 and 1920 CSS pixels.
6. Keyboard-only and screen-reader spot checks.
7. Lighthouse run against the production preview.

Do not report any of these checks as passed until the commands or browser tests have actually run.
