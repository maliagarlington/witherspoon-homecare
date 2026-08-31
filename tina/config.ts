import { defineConfig } from "tinacms";

// Every collection below is a "global" collection (ui.global: true), which
// means it holds exactly one document and opens straight to its edit form
// in Tina's sidebar under "Site", rather than showing a list of files to
// pick from first. That's the simplest mental model for a non-technical
// editor: one entry per page, no "create new" or "delete" actions to worry
// about (allowedActions below disables both).
const singleDocument = {
  ui: { global: true },
  allowedActions: { create: false, delete: false },
};

// Shared validator for short CTA-style button text: this site's buttons are
// styled to never wrap to a second line, so a label that's too long breaks
// the design. Keeping this under one label's worth of characters (roughly
// what already fits comfortably on the smallest supported phone screen)
// avoids that. Returning a string from ui.validate shows it as a red
// warning in the sidebar without blocking saving.
function shortButtonTextValidator(maxLength: number) {
  return (value?: string) => {
    if (value && value.length > maxLength) {
      return `Keep this to ${maxLength} characters or fewer so the button text fits on one line, even on a small phone screen. Currently ${value.length}.`;
    }
    return undefined;
  };
}

export default defineConfig({
  branch:
    process.env.TINA_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },

  schema: {
    collections: [
      // ------------------------------------------------------------------
      // SITE SETTINGS: shared identity info used across every page (the
      // header, footer, and every "Call" button all pull from this one
      // place, so it only has to be updated once).
      // ------------------------------------------------------------------
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ...singleDocument,
        fields: [
          {
            type: "string",
            name: "businessName",
            label: "Business Name",
          },
          {
            type: "image",
            name: "logoImage",
            label: "Custom Logo Image",
            description:
              "Optional. Leave blank to keep the default Witherspoon Home Care logo mark. If you upload an image here, it replaces the logo everywhere on the site (header and footer). Keep it under 1MB, a small square logo, ideally 200x200px or larger, works best.",
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline",
            description:
              "Short phrase shown under the logo in the footer, and used as the page preview text when the site is shared on social media.",
          },
          {
            type: "string",
            name: "phone",
            label: "Phone Number",
            description: "Format: 336-842-9744. Shown across the whole site.",
          },
          {
            type: "string",
            name: "email",
            label: "Email Address",
          },
          {
            type: "string",
            name: "primaryCity",
            label: "Main City",
            description:
              "The largest city in your service area (currently Winston-Salem). Mentioned in a few places alongside the county list.",
          },
          {
            type: "string",
            name: "serviceCounties",
            label: "Counties Served",
            list: true,
            description:
              "One entry per county (just the name, e.g. \"Forsyth\", not \"Forsyth County\"). Shown as a list in the footer and on the homepage's \"Areas We Serve\" section.",
          },
        ],
      },

      // ------------------------------------------------------------------
      // HOME PAGE
      // ------------------------------------------------------------------
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "json",
        ...singleDocument,
        ui: {
          ...singleDocument.ui,
          router: () => "/",
        },
        fields: [
          {
            type: "string",
            name: "heroHeadline",
            label: "Hero Headline",
            description:
              "The big headline on the homepage. The last part after the final space is shown in pink; see \"Hero Headline Accent\" below to control exactly where the pink starts.",
          },
          {
            type: "string",
            name: "heroHeadlineAccent",
            label: "Hero Headline (Pink Part)",
            description:
              "The words from the headline above that should be highlighted in pink, e.g. \"Like Home\". Must match the end of the Hero Headline exactly.",
          },
          {
            type: "string",
            name: "heroSubheadline",
            label: "Hero Subheadline",
            ui: { component: "textarea" },
            description: "The sentence under the big headline.",
          },
          {
            type: "string",
            name: "heroButtonText",
            label: "Hero Button Text",
            description:
              "The gold button on the homepage hero. Keep this short (see warning below).",
            ui: { validate: shortButtonTextValidator(40) },
          },
          {
            type: "string",
            name: "heroVideoUrl",
            label: "Hero Video Link",
            description:
              'Optional. Paste a link to a video you\'ve uploaded elsewhere (a YouTube "Unlisted" video works well, or a direct video file link from a service like Cloudinary). Leave this blank to keep the current default video.',
          },
          {
            type: "image",
            name: "heroPoster",
            label: "Hero Preview Photo",
            description:
              "The still photo shown while the video loads, and instead of the video for visitors with motion-reduction turned on. This also becomes the preview image when the site is shared on social media. Keep it under 5MB so the page stays fast to load; a wide (landscape) photo works best here.",
          },
          {
            type: "string",
            name: "areasHeading",
            label: "\"Areas We Serve\" Heading",
          },
          {
            type: "string",
            name: "areasDescription",
            label: "\"Areas We Serve\" Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "whyChooseHeading",
            label: "\"Why Families Choose Us\" Heading",
          },
          {
            type: "object",
            name: "whyChooseReasons",
            label: "Reasons",
            list: true,
            ui: {
              itemProps: (item: { title?: string }) => ({
                label: item?.title || "New reason",
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Short Title" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "string",
            name: "howWeHelpIntro",
            label: "\"How We Help\" Intro Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "testimonialsTeaser",
            label: "Testimonials Teaser Text",
            description:
              "Short paragraph inviting visitors to read testimonials, shown above a link to the Testimonials page.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "finalCtaHeading",
            label: "Closing Section Heading",
          },
          {
            type: "string",
            name: "finalCtaText",
            label: "Closing Section Text",
            ui: { component: "textarea" },
          },
        ],
      },

      // ------------------------------------------------------------------
      // ABOUT PAGE
      // ------------------------------------------------------------------
      {
        name: "about",
        label: "About Page",
        path: "content/about",
        format: "json",
        ...singleDocument,
        ui: {
          ...singleDocument.ui,
          router: () => "/about",
        },
        fields: [
          { type: "string", name: "pageHeading", label: "Page Heading" },
          {
            type: "string",
            name: "pageIntro",
            label: "Page Intro Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "storyHeading",
            label: "\"Our Story\" Heading",
          },
          {
            type: "string",
            name: "storyText",
            label: "\"Our Story\" Text",
            ui: { component: "textarea" },
            description:
              "Your founder/owner story. This is one of the most persuasive things families read, worth writing in your own voice.",
          },
          {
            type: "image",
            name: "founderPhoto",
            label: "Founder Photo",
            description:
              "Optional photo shown next to your story. Keep it under 5MB; a square, close-up portrait works best (it's displayed in a circle).",
          },
          {
            type: "string",
            name: "missionHeading",
            label: "\"Our Mission\" Heading",
          },
          {
            type: "string",
            name: "missionText",
            label: "\"Our Mission\" Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "hiringHeading",
            label: "\"How We Choose Our Caregivers\" Heading",
          },
          {
            type: "string",
            name: "hiringIntro",
            label: "\"How We Choose Our Caregivers\" Intro Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "hiringSteps",
            label: "Hiring Process Steps",
            list: true,
            description: "One line per step, shown as a checklist.",
          },
          {
            type: "string",
            name: "ctaHeading",
            label: "Closing Section Heading",
          },
        ],
      },

      // ------------------------------------------------------------------
      // SERVICES PAGE
      // ------------------------------------------------------------------
      {
        name: "services",
        label: "Services Page",
        path: "content/services",
        format: "json",
        ...singleDocument,
        ui: {
          ...singleDocument.ui,
          router: () => "/services",
        },
        fields: [
          { type: "string", name: "pageHeading", label: "Page Heading" },
          {
            type: "string",
            name: "pageIntro",
            label: "Page Intro Text",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            description:
              "Use \"Add\" below to add a new service, the drag handle to reorder them, or the trash icon to remove one.",
            ui: {
              itemProps: (item: { title?: string }) => ({
                label: item?.title || "New service",
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Service Title" },
              {
                type: "string",
                name: "tagline",
                label: "Short Tagline",
                description:
                  'A one-line hook shown under the title, e.g. "So they\'re never alone or at risk."',
              },
              {
                type: "string",
                name: "description",
                label: "Full Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "string",
            name: "ctaText",
            label: "Closing Section Text",
            ui: { component: "textarea" },
          },
        ],
      },

      // ------------------------------------------------------------------
      // TESTIMONIALS PAGE
      // ------------------------------------------------------------------
      {
        name: "testimonials",
        label: "Testimonials Page",
        path: "content/testimonials",
        format: "json",
        ...singleDocument,
        ui: {
          ...singleDocument.ui,
          router: () => "/testimonials",
        },
        fields: [
          { type: "string", name: "pageHeading", label: "Page Heading" },
          {
            type: "string",
            name: "pageIntro",
            label: "Page Intro Text",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials",
            list: true,
            description:
              "Use \"Add\" to add a new family's testimonial, or the trash icon to remove one. If this list is empty, the page shows a friendly placeholder instead.",
            ui: {
              itemProps: (item: { author?: string }) => ({
                label: item?.author || "New testimonial",
              }),
            },
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "author",
                label: "Author",
                description:
                  'Use a first name and last initial for privacy, e.g. "Linda R."',
              },
            ],
          },
        ],
      },

      // ------------------------------------------------------------------
      // CAREERS PAGE
      // ------------------------------------------------------------------
      {
        name: "careers",
        label: "Careers Page",
        path: "content/careers",
        format: "json",
        ...singleDocument,
        ui: {
          ...singleDocument.ui,
          router: () => "/careers",
        },
        fields: [
          { type: "string", name: "pageHeading", label: "Page Heading" },
          {
            type: "string",
            name: "pageIntro",
            label: "Page Intro Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "cultureHeading",
            label: "\"Why Work With Us\" Heading",
          },
          {
            type: "object",
            name: "cultureReasons",
            label: "Reasons",
            list: true,
            ui: {
              itemProps: (item: { title?: string }) => ({
                label: item?.title || "New reason",
              }),
            },
            fields: [
              { type: "string", name: "title", label: "Short Title" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "string",
            name: "openingsNote",
            label: "Current Openings Note",
            ui: { component: "textarea" },
            description:
              'Optional. List specific open positions here, or leave blank to just say you\'re always hiring.',
          },
          {
            type: "string",
            name: "applyHeading",
            label: "\"Apply Now\" Heading",
          },
          {
            type: "string",
            name: "applyText",
            label: "\"Apply Now\" Text",
            ui: { component: "textarea" },
          },
        ],
      },

      // ------------------------------------------------------------------
      // CONTACT PAGE
      // ------------------------------------------------------------------
      {
        name: "contact",
        label: "Contact Page",
        path: "content/contact",
        format: "json",
        ...singleDocument,
        ui: {
          ...singleDocument.ui,
          router: () => "/contact",
        },
        fields: [
          {
            type: "string",
            name: "pageHeading",
            label: "Page Heading",
            description:
              "Phone number and email address are edited under Site Settings, not here, since they're shared with the header and footer.",
          },
          {
            type: "string",
            name: "pageIntro",
            label: "Page Intro Text",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "hoursText",
            label: "Hours",
          },
          {
            type: "string",
            name: "serviceAreaText",
            label: "Service Area Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "formIntro",
            label: "Contact Form Intro Text",
            ui: { component: "textarea" },
          },
        ],
      },
    ],
  },
});
