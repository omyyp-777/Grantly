# Architecture

## Current architecture

GRANTLY is a Vite-hosted React + TypeScript single-page frontend. `src/main.tsx` mounts the app and global toast presenter. The app currently owns the page shell, navigation, local state, page composition and overlays in `src/App.tsx`.

## Feature boundaries introduced

```text
src/
  features/
    applications/types.ts
    scholarships/
      components/ScholarshipCard.tsx
      data.ts
      matching.ts
      types.ts
  components/shared/StatCard.tsx
  lib/storage.ts
  utils/format.ts
  App.tsx
  main.tsx
  styles.css
```

- `features/scholarships/types.ts`: scholarship and student profile contracts.
- `features/scholarships/data.ts`: illustrative scholarship and application seed data.
- `features/scholarships/matching.ts`: deterministic, explainable match heuristic, profile completeness and human-readable profile signals.
- `features/scholarships/components/ScholarshipCard.tsx`: reusable scholarship opportunity card with saved state, callbacks and accessible match progress.
- `components/shared/StatCard.tsx`: reusable dashboard metric card.
- `features/applications/types.ts`: application record contract.
- `lib/storage.ts`: guarded browser-local JSON reads and writes.
- `utils/format.ts`: currency and deadline-day formatting.
- `App.tsx`: composition, navigation, interactive page state and page-level orchestration. Page sections remain co-located and are a known next refactor boundary.

## Data flow

The browser is the only persistence boundary. React state is initialized from `localStorage`, falls back to sample data on unavailable or malformed storage, and writes user changes back to the same browser. Search is fuzzy-matched by Fuse.js and uses React `useDeferredValue` to defer expensive matching work while the input remains responsive.

## Constraints and limitations

There is no backend, remote API, authentication service, cloud database or cross-device synchronization. Match scores are deterministic heuristics and must not be represented as official eligibility decisions or AI inference. The catalogue is illustrative. The document vault stores readiness labels only.

## Next architectural increment

Continue extracting page-level components and feature-specific state/actions out of `App.tsx` into `features/*/components` and hooks. Add route-level lazy loading only if the app grows enough to justify it. Avoid introducing a global state library for the current small local dataset.
