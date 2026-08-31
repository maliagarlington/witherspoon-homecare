import { business, siteUrl } from "@/content/site-content";
import type { FaqItem } from "@/content/faq";
import type { Service } from "@/content/services";

interface OfficeAddress {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
}

// JSON-LD structured data helpers.
export function organizationSchema(
  allServices: Service[] = [],
  officeAddress?: OfficeAddress | null,
) {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeHealthCareService", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: business.name,
    description:
      "Non-medical in-home care agency providing companion care, medication reminders, meal prep, light housekeeping, and daily living support for seniors and recovering adults across Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, North Carolina, including Winston-Salem.",
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    address: officeAddress?.street
      ? {
          "@type": "PostalAddress",
          streetAddress: officeAddress.street,
          addressLocality: officeAddress.city ?? undefined,
          addressRegion: officeAddress.state ?? "NC",
          postalCode: officeAddress.zip ?? undefined,
          addressCountry: "US",
        }
      : {
          "@type": "PostalAddress",
          addressRegion: "NC",
          addressCountry: "US",
        },
    areaServed: [
      ...business.serviceCounties.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county} County, NC`,
      })),
      { "@type": "City", name: "Winston-Salem, NC" },
      { "@type": "State", name: "North Carolina" },
    ],
    priceRange: "$$",
    ...(allServices.length > 0 && {
      makesOffer: allServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: "North Carolina",
        },
      })),
    }),
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
