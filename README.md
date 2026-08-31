# Witherspoon Home Care

Marketing website for Witherspoon Home Care, an in-home care agency serving Forsyth County, NC. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Contact / careers / resume forms

The Contact page's general inquiry form POSTs to `/api/contact`; the Careers page's apply form (which requires a resume upload) POSTs to `/api/apply`. Both send email via [Resend](https://resend.com), and both use the same environment variables. Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`: a Resend API key
- `CONTACT_TO_EMAIL`: where submissions should be delivered (defaults to `witherspoonhomecare@gmail.com`)

Without `RESEND_API_KEY` set, the forms fail gracefully and point visitors to call or email directly instead of silently pretending the message was sent. Set the same variables in your Vercel project settings before launch.

`/api/apply` caps resumes at 5MB and only accepts `.pdf`, `.doc`, and `.docx`. Note Vercel's own serverless request-body limit sits close to that on some plans, so if uploads near 5MB start failing in production, lower `MAX_FILE_BYTES` in `src/app/api/apply/route.ts` (and the matching UI copy/validation in `src/components/ResumeUploadForm.tsx`) rather than raising it.

## Before launch: content still needed

A few sections were intentionally left as clearly-marked placeholders rather than invented, and should be filled in with real details before this goes live:

- **`src/content/site-content.ts`**: `about.founderStoryPlaceholder` (founder/owner bio) and `about.hiringNote` (exact background-check/training process).
- **`src/content/site-content.ts`**: `contact.hoursNote` (confirm exact hours if you want specific hours listed instead of the general "available every day" line).
- **`src/content/site-content.ts`**: `testimonials` array is empty. Add real client quotes as `{ quote, author }` once you have them, and the Testimonials page and its `Review` schema will pick them up automatically.
- **`src/lib/schema.ts`**: add a real street address once confirmed, for stronger local SEO.
- **`.env.example` / Vercel env vars**: `NEXT_PUBLIC_SITE_URL` should be set to the real production domain (used in metadata, sitemap, and JSON-LD), and `RESEND_API_KEY` must be set for the forms to actually deliver email.

## Deploying

Connect the repo to Vercel. It will auto-build with `next build` and deploy on push. Set the environment variables above in the Vercel project settings.
