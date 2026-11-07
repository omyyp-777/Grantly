# Performance

## Changes in this pass

- Scholarship fuzzy search now consumes a deferred query via React `useDeferredValue`, keeping input state updates separate from potentially more expensive result matching.
- Search index creation and filtered result calculation remain memoized against their actual inputs.
- Browser storage operations are isolated in small guarded helpers.
- Existing reduced-motion handling for Lenis and GSAP is retained.

## Existing performance considerations

- The app imports motion, scrolling, fuzzy-search and visual-effect libraries from the root application module. A future route/feature split can reduce initial JavaScript by lazy-loading heavier features.
- `App.tsx` still declares page components inside the root component; a larger refactor should move stable components to module scope to reduce component recreation and clarify ownership.
- The app uses remote Google Fonts in `index.html`; performance should be measured with the actual deployed network conditions.

## Verification status

No Lighthouse or Web Vitals score is claimed. A production build could not be completed because dependencies were absent and dependency installation timed out. Run `npm ci` (after adding/confirming a committed lockfile) or `npm install`, then measure the production preview with Lighthouse on representative desktop and mobile profiles.
