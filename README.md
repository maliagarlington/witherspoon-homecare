# Witherspoon Home Care

Marketing website for Witherspoon Home Care, an in-home care agency serving Forsyth County, NC. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Content editing (TinaCMS)

Nearly all of the site's text, images, and the hero video are editable through [TinaCMS](https://tina.io) at `/admin`, without touching code. See the "Content editing" section of this repo's handoff notes for the plain-language walkthrough meant for the site owner; this section is the developer-facing setup reference.

**How content is organized:** editable content lives as JSON files under `content/` (one folder per page, plus `content/settings/` for the business name, phone, email, logo, and county list shared across every page). `tina/config.ts` defines the fields, labels, and helper text for each. Pages fetch their content via the generated client (`tina/__generated__/client.ts`, regenerated on every `npm run dev` / `npm run build`, gitignored) and render it through Tina's `useTina` hook, which is what powers click-to-edit visual editing directly on the live page.

**What's still static (not in Tina):** navigation links, the FAQ list on the Services page, and SEO/structured-data metadata (JSON-LD, the Open Graph share image, sitemap) continue to read from `src/content/site-content.ts` and `src/content/faq.ts`. These change rarely enough that wiring them into the CMS wasn't worth the added complexity; update them directly in code if needed.

**Local editing (no Tina Cloud account needed):** `npm run dev` runs Tina's local mode automatically (via `tinacms dev -c "next dev"`), backed by a local GraphQL server reading straight from the `content/` JSON files. Visit `/admin` to edit with no `NEXT_PUBLIC_TINA_CLIENT_ID`/`TINA_TOKEN` set at all.

**Tina Cloud (hosted editing after deployment):**
1. Create a project at [app.tina.io](https://app.tina.io), connecting it to this repo's GitHub connection.
2. Copy the Client ID (project's "Overview" tab) and generate a read-only Token (project's "Tokens" tab).
3. Add `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` to Vercel's Project Settings -> Environment Variables (and to `.env.local` for local testing against Tina Cloud instead of local mode).
4. Set up authentication for who's allowed to log in and edit: Tina Cloud's dashboard has this under the project's "Users" tab. Invite only the people who should be able to edit (the site owner, and any developers) by email; nobody else can reach `/admin` without being added there.
5. Redeploy. `npm run build` runs `tinacms build && next build`; with real credentials present, this regenerates the client against the live Tina Cloud API instead of local mode.

**The hero video:** Tina's media manager supports images, but not direct video upload (this is a known, currently unsupported limitation of TinaCMS itself, not something specific to this project). The "Hero Video Link" field on the Home page is a plain URL field instead: paste a link to a video uploaded elsewhere (an unlisted YouTube video, or a direct file link from a service like Cloudinary), and the homepage automatically detects and embeds YouTube/Vimeo links, or plays a direct file link natively. Leave it blank to keep the built-in placeholder video.

**Adding/removing list items (services, testimonials, etc.):** these are Tina "list" fields, editable with the "Add" button and a trash icon per item directly in the sidebar form, no code changes needed.

## Contact / careers / resume forms

The Contact page's general inquiry form POSTs to `/api/contact`; the Careers page's apply form (which requires a resume upload) POSTs to `/api/apply`. Both send email via [Resend](https://resend.com), and both use the same environment variables. Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`: a Resend API key
- `CONTACT_TO_EMAIL`: where submissions should be delivered (defaults to `witherspoonhomecare@gmail.com`)

Without `RESEND_API_KEY` set, the forms fail gracefully and point visitors to call or email directly instead of silently pretending the message was sent. Set the same variables in your Vercel project settings before launch.

`/api/apply` caps resumes at 5MB and only accepts `.pdf`, `.doc`, and `.docx`. Note Vercel's own serverless request-body limit sits close to that on some plans, so if uploads near 5MB start failing in production, lower `MAX_FILE_BYTES` in `src/app/api/apply/route.ts` (and the matching UI copy/validation in `src/components/ResumeUploadForm.tsx`) rather than raising it.

## Before launch: content still needed

A few pieces of content were intentionally left blank rather than invented, and can now be filled in through Tina at `/admin` (no code changes needed):

- **About page**: "Our Story" text (founder/owner bio) and the "Founder Photo" image are both empty.
- **Careers page**: "Current Openings Note" is empty (defaults to the general "always hiring" messaging).
- **Testimonials page**: the testimonials list is empty. Add entries there once real client quotes exist, and the page's `Review` JSON-LD schema will pick them up automatically.

A couple of things remain code-level, not CMS-level:

- **`src/lib/schema.ts`**: add a real street address once confirmed, for stronger local SEO.
- **`.env.example` / Vercel env vars**: `NEXT_PUBLIC_SITE_URL` should be set to the real production domain (used in metadata, sitemap, and JSON-LD), `RESEND_API_KEY` must be set for the forms to actually deliver email, and `NEXT_PUBLIC_TINA_CLIENT_ID` / `TINA_TOKEN` must be set for hosted editing (see "Content editing (TinaCMS)" above).

## Deploying

Connect the repo to Vercel. It will auto-build with `next build` and deploy on push. Set the environment variables above in the Vercel project settings.
