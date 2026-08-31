// Core business info — pulled from Witherspoon Home Care flyer + presentation
// Verify phone/email are still current before launch.

export const business = {
  name: "Witherspoon Home Care",
  tagline: "Caring for Your Loved Ones — In the Comfort of Home",
  heroLine:
    "When a family member needs daily support but you still have to work — we step in so you don't have to worry.",
  phone: "336-842-9744",
  phoneHref: "tel:+13368429744",
  email: "witherspoonhomecare@gmail.com",
  serviceArea: "Forsyth County, NC",
  closingLine:
    "Let us be the extra set of hands you can trust.",
};

// "Why Choose Us" section — from slide 5
export const whyChooseUs = [
  {
    title: "Personalized, One-on-One Care",
    description:
      "Every client receives individual attention tailored to their unique needs — never a one-size-fits-all approach.",
  },
  {
    title: "Comfort of Home",
    description:
      "Familiar surroundings reduce anxiety, especially for those with dementia or cognitive decline.",
  },
  {
    title: "Family Peace of Mind",
    description:
      "We step in when you can't be there — a trusted set of hands you can count on every day.",
  },
  {
    title: "Affordable Alternative",
    description:
      "In-home care is often a fraction of the cost of assisted living facilities, without sacrificing quality.",
  },
];

// NC market stats — from slide 3 (AARP 2024 Survey). Good candidates for an
// "About" or "Why In-Home Care" section, and solid factual material for LLMO
// (llms.txt, FAQ schema) since they're specific and sourced.
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

// TODO: no testimonials in the source materials yet.
// Once real client quotes come in, add them here as:
// { quote: "...", author: "First name + last initial" }
export const testimonials: { quote: string; author: string }[] = [];

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

// About page copy.
// TODO: the founder story and hiring/vetting specifics below are written as
// safe, generic placeholders — replace with the real founder bio and the
// agency's actual screening steps before launch.
export const about = {
  intro:
    "Witherspoon Home Care is a family-owned home care agency serving Forsyth County, NC. We started this agency because our own family has walked the road of caring for an aging loved one while juggling work and daily life — and we wanted to build the kind of dependable, personal support we wished we'd had.",
  founderStoryPlaceholder:
    "[Add founder/owner bio here — background, years of experience, and what led to starting Witherspoon Home Care. This is a strong trust signal for families and search engines alike.]",
  hiringProcess: [
    "Every caregiver completes an in-person interview before joining our team.",
    "We check references and conduct a background screening prior to placement.",
    "Caregivers are matched to clients based on needs, personality, and schedule — not assigned at random.",
    "We stay in touch with families after care begins to make sure the match is working.",
  ],
  hiringNote:
    "[Confirm the specific background-check provider, training program, and any licensing/certification details, then update this list with the exact process.]",
  mission:
    "To give families in Forsyth County a trustworthy extra set of hands — so aging and recovering loved ones can stay safe, comfortable, and cared for at home, and the people who love them can stop carrying it alone.",
};

// Careers page copy.
export const careers = {
  intro:
    "We're always hiring compassionate, reliable caregivers to join our team in Forsyth County.",
  culture: [
    {
      title: "Meaningful Work",
      description:
        "Spend your day making a real difference in one family's life at a time, not rushing between quotas.",
    },
    {
      title: "Flexible Scheduling",
      description:
        "We work with your availability — full-time, part-time, and shifts that fit real life.",
    },
    {
      title: "Supportive Team",
      description:
        "You're never on your own. Our team is reachable when you need guidance or backup.",
    },
  ],
  openingsNote:
    "[List current specific openings here, or keep the general \"always hiring\" messaging if positions are ongoing/rolling.]",
};

// Contact page copy.
// TODO: confirm exact hours of operation before launch — the line below is
// intentionally general until that's finalized.
export const contact = {
  hoursNote:
    "Care coordination and scheduling support is available every day — call or email anytime and we'll get back to you promptly.",
  serviceAreaDescription:
    "We provide in-home care throughout Forsyth County, NC, including Winston-Salem and surrounding communities.",
  formIntro:
    "Tell us a little about your situation and we'll follow up to talk through the right kind of support.",
};
