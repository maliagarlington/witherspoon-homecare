// Services list, from the flyer "Our Home Health Support Services" and slide 4.
// Each maps to a section/anchor on the Services page.

export interface Service {
  slug: string;
  title: string;
  tagline: string; // short phrase from the source material
  description: string; // slightly expanded for SEO/LLMO, edit as needed
}

export const services: Service[] = [
  {
    slug: "companion-care",
    title: "Companion Care & Safety Sitting",
    tagline: "So they're never alone or at risk.",
    description:
      "Our companion care pairs your loved one with a caregiver who provides companionship and supervision, reducing fall risk and isolation for seniors living alone.",
  },
  {
    slug: "rehab-support",
    title: "Rehab Support (PT/OT Exercises)",
    tagline: "Keeping them on track between appointments.",
    description:
      "We help clients stay consistent with physical and occupational therapy exercises prescribed by their care team, supporting recovery between scheduled appointments.",
  },
  {
    slug: "medication-reminders",
    title: "Medication Reminders",
    tagline: "No missed doses, no confusion.",
    description:
      "Caregivers provide timely reminders to take medication as prescribed, helping prevent missed or duplicate doses.",
  },
  {
    slug: "meal-prep",
    title: "Meal Prep, Hydration & Feeding Help",
    tagline: "Making sure they stay nourished.",
    description:
      "From preparing meals to encouraging regular hydration and assisting with feeding when needed, we help ensure proper nutrition every day.",
  },
  {
    slug: "daily-preparation",
    title: "Daily Preparation",
    tagline: "Dressing & hygiene assistance.",
    description:
      "Respectful, dignified assistance with dressing and daily hygiene routines.",
  },
  {
    slug: "errands",
    title: "Errands",
    tagline: "From pharmacy runs to grocery store.",
    description:
      "Caregivers handle pharmacy pickups, grocery runs, and other errands so your loved one's essentials are always covered.",
  },
  {
    slug: "light-housekeeping",
    title: "Light Housekeeping & Home Comfort Care",
    tagline: "A clean, safe space for recovery.",
    description:
      "Light housekeeping to keep the home clean, safe, and comfortable, supporting a healthy recovery and living environment.",
  },
];
