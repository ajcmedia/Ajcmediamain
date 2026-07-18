# AJC Media CMS setup

The public design is still rendered by the existing React components. MongoDB now supplies the content values that those components display, stores booking requests, and stores uploaded images through GridFS.

## 1. Configure the environment

Copy the variable names from `.env.example` into `.env.local` and replace every placeholder.

Required for admin access:

- `ADMIN_PASSWORD`: the photographer's login password.
- `ADMIN_SESSION_TOKEN`: a separate random value of at least 32 characters. Do not reuse the password.

Required for CMS content, uploads, and booking persistence:

- `MONGODB_URI`: the MongoDB Atlas connection string.
- `MONGODB_DB`: normally `ajc_media`.

Required for booking notification emails:

- `SMTP_HOST`: `smtp.gmail.com` for Gmail.
- `SMTP_PORT`: `465`.
- `SMTP_SECURE`: `true`.
- `SMTP_USER`: the Gmail address used to send notifications.
- `SMTP_PASS`: the Google App Password, not the normal Gmail password.
- `BOOKING_EMAIL_FROM`: the sender name and address.
- `BOOKING_EMAIL_TO`: the photographer/admin inbox that should receive new requests.

Add the same variables to the production hosting provider and restart or redeploy the application after changing them.

## 2. MongoDB Atlas checklist

1. Create a database user with read/write access for this application.
2. Add the production host to Atlas Network Access.
3. Put the generated connection string in `MONGODB_URI`. URL-encode special characters in the database password when required.
4. Keep `MONGODB_DB=ajc_media` unless a different database name is intentional.

The first successful CMS request seeds the current website content into the `site_content` collection. Booking submissions use the `bookings` collection. Uploaded images use the `media.files` and `media.chunks` GridFS collections.

## 3. Admin workflow

Open `/admin-login`, enter `ADMIN_PASSWORD`, and use the sidebar to manage:

- booking requests, statuses, and private notes;
- Hero, About, experience reel, services, and before/after images;
- exactly three connected Gallery Portals;
- Gallery categories and projects;
- pricing packages;
- Featured Story frames;
- Editorial Wall frames.

Content edits remain in the browser as a draft until **Publish website changes** is selected. Uploaded images are limited to 8 MB and support JPEG, PNG, WebP, GIF, and AVIF.

### Replacing a Gallery Portal

Each portal points to a Gallery category using a stable ID. To replace a portal whose category already contains photographs:

1. Open **Gallery** and reassign or delete the projects in that category.
2. Open **Gallery Portals** and delete the portal plus its now-unused category.
3. Add a replacement portal/category and complete its image and wording.
4. Publish only after the dashboard is back to exactly three portals.

This draft workflow prevents the public site from briefly publishing only two portals and prevents orphaned Gallery projects.

## 4. Booking behavior

A valid booking submission is saved to MongoDB first. The email notification is attempted afterward. If Gmail is temporarily unavailable, the request remains visible in the admin inbox and is marked **Email pending** instead of being lost.

## 5. Verification

Run these commands after environment or deployment changes:

```powershell
npm run typecheck
npm run build
```
