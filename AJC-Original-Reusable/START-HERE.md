# Preserved original AJC Media website

This is a verified copy of the original dark website and CMS, made before the September 4, 2026 redesign. Move this whole folder wherever you want. It runs independently after installing dependencies.

## Run this copy
1. Install Node.js and run `npm ci` inside this folder.
2. Copy `.env.example` to `.env.local` and supply NEW admin credentials, a separate MongoDB database, and your own SMTP settings. See CMS_SETUP.md.
3. Run `npm run dev`. If another copy is running, use `npm run dev -- --port 3001`.

## Reuse for another photographer
- `app/layout.tsx`: browser title, description, and website address.
- `data/site.ts`: navigation and social profiles.
- `public/assets/brand/ajc-logo.svg`: logo.
- `tailwind.config.ts`: brand colours.
- `components/`: visible headings, photographer name, contact details, footer, and transition labels. Search for AJC, Jayson, Vancouver, ajcmedia, mailto:, and tel: to find brand-specific copy. Update both displayed contact details and their links.
- `data/site-content.ts`: initial sample content. Use the CMS to edit images, services, prices, and galleries after connecting your own database.
- `.env.local`: new database, passwords, email sender, and notification recipient. Never reuse AJC's production connection for another brand.
- Replace sample photos with images you have permission to publish.

## What is preserved
All original app, CMS, API, local asset, and configuration source files. Dependencies can be restored from the lockfile. This copy intentionally retains AJC branding as the starting point; it is not an automatically rebranded template.

## What is not included
Secrets (.env.local), installed dependencies, generated builds, Git history, live database documents, uploaded GridFS photos, or booking records. Existing database-hosted photos/content require a separate MongoDB export if you want a complete archival backup. The source fallback and local assets remain included.
