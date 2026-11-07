# GRANTLY v2.0 — implementation notes

## Included in this update

- **Scholarship Passport editor:** editable name, course, institution, year, study level, academic score, income band and state.
- **Live profile completeness:** calculated from the eight profile fields instead of a fixed 85% label.
- **Explainable indicative matching:** the local scoring heuristic uses profile study level, score, course keywords, income band and the scholarship's displayed eligibility text. Scores are recalculated when the profile is saved and sorted highest-first in Discover and the dashboard.
- **Application tracker CRUD improvement:** remove an application from the local tracker, in addition to its existing stage updates and persistence.
- **Responsive and accessibility polish:** additional breakpoints for compact phones, tablet layouts, profile forms, visible keyboard focus and reduced-motion support (retaining the existing reduced-motion rules).
- **Legacy profile migration:** existing saved profiles without the new study-level field default to Undergraduate rather than breaking the matching calculation.

## Frontend-only boundaries

This build continues to use browser storage. Scholarship entries are illustrative demo data; matching is a transparent heuristic, not an official eligibility decision or a remote AI service. No backend, authentication, live scholarship feed, cloud document storage or verified funding data is introduced. The document vault remains a checklist and does not upload files in this version.

## Run locally

```bash
npm install
npm run dev
```

## Production validation

```bash
npm run build
npm run preview
```

Run the commands above in an environment with npm registry access. The source package was not dependency-installed in the packaging environment, so a production build could not be executed here.
