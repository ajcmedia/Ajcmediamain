# AJC Media — unified light redesign

The active project uses one ivory, charcoal and muted-green design system throughout: homepage, every portfolio section, gallery preview, studio login, CMS, access-denied page and not-found page. The original design remains untouched in AJC-Original-Reusable.

## Retained functions
- Hero: all CMS lead/highlight/detail image slots, manual frame selection, optional automatic slideshow, focal points and zoom.
- Experience: desktop scroll progression, manual scene selection, mobile swipe and scene controls.
- Collections: each portal still selects its linked gallery category; original portal-entry transition retained.
- Services and pricing: existing data fields, images/icons, package features, featured state, and booking links.
- Featured story: selectable frames and next-frame interaction.
- Editing comparison: automatic comparison and manual pointer/keyboard control. Both images now stay aligned while clipping.
- Editorial archive: desktop scroll-driven horizontal progression, mobile drag/swipe/arrows, responsive and reduced-motion handling.
- Gallery: categories, visibility, image crops, project lightbox, plus Escape close and focus return.
- Booking and contact: existing submission, status feedback and contact links.
- CMS: existing authentication, session recovery, uploads/focal points, category links, CRUD/reorder, draft state, publish feedback and booking management. No API or database schema changes.
- Original hyperlink shutter timing/navigation retained, recoloured to match the light theme.

## Editing
The CMS retains the same content fields. Source-only brand and introductory copy remains in the section components. Fallback headings in data/site-content.ts were refreshed; no published MongoDB content was overwritten.

## Verification
TypeScript passed. Browser checks with isolated sample content covered desktop/mobile public layouts, consistent light backgrounds, transition cover/idle and destination, collection category selection, gallery open/Escape close, hero selection, mobile menu, scene controls, comparison keyboard input, mobile archive arrows, CMS login/password visibility, image editor, draft/publish-enabled feedback, and mobile CMS width. No real booking was sent or CMS content published. Final production build and whitespace checks passed. Twenty backend/type files were hash-verified against the preserved original.

The temporary CMS walkthrough used process-only test credentials with no database connection. Saved .env.local and real credentials were not changed. Database persistence, real uploads and SMTP delivery still need a connected environment for end-to-end verification.

## Preserved original
Move the whole AJC-Original-Reusable folder for storage. It contains the original code and local photos, plus START-HERE.md. Credentials, dependencies, builds and live MongoDB/GridFS data are excluded. This is a reusable source copy, not a database backup.

