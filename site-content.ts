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
