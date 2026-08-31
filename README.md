# Witherspoon Home Care

Marketing website for Witherspoon Home Care, an in-home care agency serving Forsyth County, NC. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Contact / careers forms

The Contact and Careers pages POST to `/api/contact`, which sends email via [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — a Resend API key
- `CONTACT_TO_EMAIL` — where submissions should be delivered (defaults to `witherspoonhomecare@gmail.com`)

Without `RESEND_API_KEY` set, the forms fail gracefully and point visitors to call or email directly instead of silently pretending the message was sent. Set the same variables in your Vercel project settings before launch.

## Before launch — content still needed

A few sections were intentionally left as clearly-marked placeholders rather than invented, and should be filled in with real details before this goes live:

- **`src/content/site-content.ts`** — `about.founderStoryPlaceholder` (founder/owner bio) and `about.hiringNote` (exact background-check/training process).
- **`src/content/site-content.ts`** — `contact.hoursNote` (confirm exact hours if you want specific hours listed instead of the general "available every day" line).
- **`src/content/site-content.ts`** — `testimonials` array is empty; add real client quotes as `{ quote, author }` once you have them — the Testimonials page and its `Review` schema will pick them up automatically.
- **`src/lib/schema.ts`** — add a real street address once confirmed, for stronger local SEO.
- **`.env.example` / Vercel env vars** — `NEXT_PUBLIC_SITE_URL` should be set to the real production domain (used in metadata, sitemap, and JSON-LD), and `RESEND_API_KEY` must be set for the forms to actually deliver email.

## Deploying

Connect the repo to Vercel — it will auto-build with `next build` and deploy on push. Set the environment variables above in the Vercel project settings.
