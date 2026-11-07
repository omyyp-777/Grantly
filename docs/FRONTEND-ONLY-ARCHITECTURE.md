# Frontend-Only Architecture Boundary

GRANTLY is a browser-only demonstration application.

## Allowed runtime behavior

- React state and client-side computation.
- Static illustrative scholarship records bundled with the app.
- `localStorage` persistence on the current browser/device.
- Client-side fuzzy search, filtering, sorting and deterministic matching.
- Browser UI feedback and local checklist state.

## Explicitly not provided

- Backend server or business-logic API.
- Server-side database or cloud persistence.
- Authentication or authorization service.
- Live scholarship feed or provider verification.
- Remote AI matching model.
- Secure document upload/storage.
- Cross-device synchronization or shared accounts.

The application must not imply that locally stored records are backed up, encrypted vault files, official eligibility decisions or real-time scholarship availability. Sensitive documents should not be uploaded to this demo. A production integration would require separately designed and reviewed services; those are outside this repository's frontend-only scope.
