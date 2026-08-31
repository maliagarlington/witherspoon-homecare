# Witherspoon Home Care — Website Project Spec

**Business:** Witherspoon Home Care
**Tagline:** Caring for Your Loved Ones — In the Comfort of Home
**Phone:** 336-842-9744 | **Email:** witherspoonhomecare@gmail.com
**Service area:** Forsyth County, NC
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + Vercel
**Build partner:** Claude Code

Structured content extracted from the flyer and presentation lives in `content/services.ts` and `content/site-content.ts` — hand these straight to Claude Code alongside this spec.

---

## 1. Tech Stack Setup

```bash
npx create-next-app@latest healthcare-site \
  --typescript --tailwind --app --src-dir --import-alias "@/*"
cd healthcare-site
```

- **Next.js App Router** — needed for server-rendered HTML (critical for SEO + LLM crawlers that don't execute JS)
- **Tailwind CSS** — mobile-first utility classes, ships with the scaffold above
- **Deploy:** connect the GitHub repo to Vercel, auto-deploys on push, free tier is plenty to start
- **Forms:** use a simple serverless approach — Vercel + a form handler like Formspree, or a Next.js API route that emails via Resend/SendGrid
- **Images:** `next/image` for automatic optimization (matters a lot on mobile connections)

Recommended folder structure:

```
src/
  app/
    layout.tsx              # root layout: header nav, footer, JSON-LD org schema
    page.tsx                # Home
    about/page.tsx
    services/page.tsx
    testimonials/page.tsx
    careers/page.tsx
    contact/page.tsx
    sitemap.ts               # auto-generates sitemap.xml
    robots.ts                 # auto-generates robots.txt
  components/
    Header.tsx
    Footer.tsx
    CTAButton.tsx             # sticky "Call Now" mobile CTA
    ServiceCard.tsx
    TestimonialCard.tsx
    FAQAccordion.tsx
  lib/
    schema.ts                 # JSON-LD helper functions
  content/
    services.ts                # structured service data (pulled from your flyer/PPT)
    testimonials.ts
    faq.ts
public/
  llms.txt
  favicon, og-image, etc.
```

---

## 2. Navigation & Page-by-Page Spec

**Header nav:** Home · About · Services · Contact Us · Testimonials · Careers
- Sticky header on mobile, collapses into a hamburger menu below `md:` breakpoint
- A persistent "Call Now" button (tel: link) visible on mobile — this is the #1 conversion action for a home care business

### Home
- Hero: one clear sentence of who you serve + where ("Trusted in-home care for Forsyth County families") + phone CTA
- Trust signals row: years in business, certifications/licensing, "family owned," insurance accepted if applicable
- 3–4 service highlights linking to Services page
- Short testimonial snippet
- Secondary CTA: "Request a Free Consultation" form

### About
- Founder/owner story (your mother-in-law's background — this is strong E-E-A-T signal for Google and a good source for LLM citation)
- Caregiver hiring/vetting process (background checks, training) — families care a lot about this
- Mission statement

### Services
Seven services from the flyer, each its own section/anchor (see `content/services.ts`):
1. Companion Care & Safety Sitting
2. Rehab Support (PT/OT Exercises)
3. Medication Reminders
4. Meal Prep, Hydration & Feeding Help
5. Daily Preparation (Dressing & Hygiene)
6. Errands (pharmacy, grocery)
7. Light Housekeeping & Home Comfort Care

This page carries the most long-tail SEO weight — e.g. "companion care Forsyth County," "medication reminders for seniors Winston-Salem."

### Testimonials
- **No quotes exist yet in the source material** — needs 2-3+ real client/family quotes before this page can go live with real content. Use first name + last initial.
- Consider adding `Review` schema markup for rich snippets in Google once quotes exist

### Home (stat bar, from the presentation — good LLMO material, cite AARP 2024)
- 2.7M seniors in NC by 2040 (up from 1.8M today)
- 75% of seniors want to stay home (AARP 2024 Survey)
- 10,000+ NC residents on waiting lists for home-based services
- $28/hr avg. in-home care rate vs. $5,769/mo for facilities

### Careers
- Current openings (or "always hiring compassionate caregivers")
- Simple application form or link to an ATS if you use one
- Culture/benefits blurb

### Contact Us
- Phone (click-to-call), email, service area description
- Simple contact form (name, phone, message)
- Hours of operation
- Optional: embedded map showing Forsyth County coverage

---

## 3. SEO Checklist

- [ ] One `<h1>` per page, semantic HTML throughout
- [ ] Unique `<title>` + meta description per page (Next.js `generateMetadata`)
- [ ] `LocalBusiness` (or more specific `MedicalBusiness`/`HomeHealthCareService`) JSON-LD schema in root layout — include name, phone, address, service area (Forsyth County), hours
- [ ] `FAQPage` schema on a Services or FAQ section
- [ ] `sitemap.xml` and `robots.txt` (Next.js `sitemap.ts` / `robots.ts` files auto-generate these)
- [ ] OpenGraph + Twitter card meta tags for link previews
- [ ] Core Web Vitals: `next/image`, minimal client JS, fonts self-hosted via `next/font`
- [ ] Consistent NAP (Name, Address, Phone) matching your Google Business Profile exactly

## 4. LLMO Checklist (showing up in ChatGPT/Perplexity/AI Overviews)

- [ ] Add `public/llms.txt` — a plain-text summary of the business, services, and service area, written in clear factual sentences (not marketing copy)
- [ ] Make sure every page is fully server-rendered (no content that only appears after client-side JS runs)
- [ ] State facts plainly and specifically: "We provide 24/7 in-home personal care in Forsyth County, NC" reads and gets cited better than vague taglines
- [ ] JSON-LD structured data does double duty here — LLM crawlers use it the same way search engines do
- [ ] Keep NAP and service list identical across the site, Google Business Profile, and any directory listings — LLMs cross-reference these for confidence

---

## 5. Next Steps

1. Upload the PowerPoint and flyer — I'll pull out the service list, bios, and any testimonials to structure into `content/services.ts`, `content/testimonials.ts`, etc.
2. Confirm the exact business name, phone number, and address (or PO box / service-area-only if no public office) for the schema markup and Contact page.
3. Once content is structured, hand this spec + the content files to Claude Code to scaffold and build out the actual pages.
