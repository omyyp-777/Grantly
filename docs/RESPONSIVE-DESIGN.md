# Responsive Design

## Existing responsive strategy

The UI uses a desktop fixed sidebar that becomes an off-canvas navigation panel below 760px, fluid content spacing, responsive scholarship grids, and stacked dashboard/profile/document/insights layouts. Existing stylesheet breakpoints are 1100px, 950px, and 760px; this pass adds narrow-phone safeguards below 380px.

## Implemented hardening

- Added `min-width: 0` to key layout containers to reduce intrinsic-width overflow.
- Added compact horizontal padding and tighter card/stat spacing for 320–380px screens.
- Allowed headings, result metadata and numeric stat values to wrap on narrow screens.
- Preserved the existing mobile sidebar and one-column scholarship grid behavior.

## Required validation matrix

| Viewport width | Validation status |
|---:|---|
| 320, 360, 375, 390, 430 | CSS safeguards added; browser validation pending |
| 640, 768, 820, 1024 | Existing responsive rules present; browser validation pending |
| 1280, 1440, 1920 | Existing desktop layout present; browser validation pending |

## Manual acceptance checklist

- [ ] No unintended horizontal page scrolling.
- [ ] Sidebar opens and closes without covering essential controls permanently.
- [ ] Cards and statistics remain readable without clipping.
- [ ] Application table scrolls within its own wrapper when needed.
- [ ] Dialog fits within the visible viewport and can be dismissed.
- [ ] Inputs, selects and buttons remain usable at touch sizes.
- [ ] Charts and progress bars retain legible labels.

No viewport is marked passed until it has been checked in a browser.
