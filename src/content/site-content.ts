// Core business info. This is now a fallback/default data source only: the
// live values families and search engines actually see come from Tina's
// "Site Settings" document (content/settings/settings.json), edited at
// /admin. `business` here still backs a few things Tina doesn't manage
// directly: JSON-LD structured data (src/lib/schema.ts), the Open Graph
// share image, and the API routes' default "send to" address, all of which
// change rarely enough that wiring them up to live CMS data wasn't worth
// the added complexity. Keep this in sync with Site Settings by hand if the
// business name, phone, or email ever changes.
export const business = {
  name: "Witherspoon Home Care",
  tagline: "Caring for Your Loved Ones in the Comfort of Home",
  heroLine:
    "When a family member needs daily support but you still have to work, we step in so you don't have to worry.",
  phone: "336-842-9744",
  phoneHref: "tel:+13368429744",
  email: "witherspoonhomecare@gmail.com",
  serviceCounties: [
    "Forsyth",
    "Guilford",
    "Davie",
    "Davidson",
    "Surry",
    "Stokes",
    "Rockingham",
    "Yadkin",
  ],
  serviceArea:
    "Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham & Yadkin Counties, NC",
  primaryCity: "Winston-Salem",
};

// NC market stats, from slide 3 (AARP 2024 Survey). Not currently rendered
// anywhere (StatBar exists as a component but isn't included on any page);
// kept here as ready-to-use, sourced material if that section comes back.
export const stats = [
  {
    value: "2.7M",
    label: "Seniors in NC by 2040",
    detail: "Up from 1.8M today",
  },
  {
    value: "75%",
    label: "Want to stay home",
    detail: "AARP 2024 Survey",
  },
  {
    value: "10,000+",
    label: "On NC waiting lists",
    detail: "For home-based services",
  },
  {
    value: "$28/hr",
    label: "Avg. in-home care rate",
    detail: "vs. $5,769/mo for facilities",
  },
];

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.witherspoonhomecare.com";

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];
