import { business, siteUrl } from "@/content/site-content";
import type { FaqItem } from "@/content/faq";

// JSON-LD structured data helpers.
// TODO: once a public street address is confirmed, add it under "address"
// (streetAddress, addressLocality, postalCode) for stronger local SEO.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeHealthCareService", "LocalBusiness"],
    name: business.name,
    description:
      "Non-medical in-home care agency providing companion care, medication reminders, meal prep, light housekeeping, and daily living support for seniors and recovering adults in Forsyth County, NC.",
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressRegion: "NC",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: business.serviceArea,
    },
    priceRange: "$$",
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function reviewSchema(
  testimonials: { quote: string; author: string }[],
) {
  if (testimonials.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.author },
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) };
}
