# Accessibility

## Improvements included

- Added a keyboard skip link that becomes visible on focus and targets the main content region.
- Added an accessible name and expanded state to the mobile navigation toggle.
- Added an accessible name to the scholarship dialog close button.
- Added modal focus entry, Tab / Shift+Tab containment, and focus restoration for the scholarship detail dialog and quick-navigation dialog.
- Retained existing semantic headings, labelled profile form controls, table headers, dialog role/`aria-modal`, Escape dismissal and reduced-motion CSS/JavaScript handling.
- Retained visible `:focus-visible` styling.

## Remaining validation and known gaps

- Dialog focus behavior is implemented but still needs manual keyboard and assistive-technology verification in a browser.
- The command palette and search wrapper should be reviewed for nested interactive semantics and complete keyboard behavior.
- Screen-reader announcements for asynchronous state changes should be tested with representative assistive technology.
- Contrast ratios should be measured rather than inferred from visual appearance.
- Test all interactive controls with keyboard-only navigation and verify logical focus order.

No automated accessibility score or WCAG conformance claim is made in this pass.
