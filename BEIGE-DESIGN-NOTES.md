# Beige Weddings reference redesign — September 8, 2026

Reference inspected on desktop and at 390px: https://www.beigeweddings.co/

The AJC design now follows the reference's full-screen photographic opening, centered serif wordmark, small uppercase navigation, portrait image ribbon, overlapping About composition, full-width photo statement, three framed collections, cream/black palette, mixed uppercase and italic serif headings, understated links, and centered closing invitation. AJC branding, copy, contacts, prices, photos and CMS content fields are retained; no reference-site photos, testimonials or awards were imported.

## Content editing
- Site Images > Homepage lead photograph controls the full-screen image.
- Highlights and detail thumbnails populate the horizontal ribbon and remain selectable for the hero. The ribbon has previous/next browsing and the hero retains its optional slideshow.
- The first two highlights also surround the CMS About portrait.
- Gallery Portals retain all three category connections and their entrance effect; the first portal photo also backs the collection introduction.
- Experience Reel retains scene selection, desktop scroll progression and mobile swipe controls.
- Existing gallery, pricing, story, archive, comparison, booking, upload, authentication and publishing functionality is retained.
- Only the built-in fallback hero image/focal point changed to an existing AJC wedding photograph. Published MongoDB content was not changed. The original camera asset remains available.

## Code
New visual rules live in app/beige-theme.css, loaded after the base interaction styles. Shared neutral palette also updated in globals.css and tailwind.config.ts. The original link transition controller and backend API/type files remain unchanged.

## Validation
TypeScript and whitespace checks passed. Browser checks covered desktop hero/About/Portals, link transition cover-to-idle, portal category filtering, lightbox open/Escape close, mobile hero/menu/Reel scene selection, and mobile CMS sign-in; no horizontal overflow at 390px. Final production build passed. Twenty backend/type files were hash-verified against the preserved original.

The preview uses the existing built-in content with a process-only empty MongoDB URI. Real publishing/uploads and SMTP delivery were not exercised. Saved environment settings, credentials and the AJC-Original-Reusable folder were not edited. No commit or deployment was performed.

