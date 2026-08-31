import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { InquiryForm } from "@/components/InquiryForm";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "@/components/icons";
import { business, contact } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Witherspoon Home Care at 336-842-9744 or witherspoonhomecare@gmail.com. Serving Forsyth County, NC with in-home care for seniors.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-6 text-xl text-brand-ink">{contact.formIntro}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col gap-8">
            <a
              href={business.phoneHref}
              className="flex min-h-[44px] items-start gap-3 text-lg font-semibold text-brand-ink hover:text-brand-pink-deep"
            >
              <PhoneIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Phone</span>
                {business.phone}
              </span>
            </a>

            <a
              href={`mailto:${business.email}`}
              className="flex min-h-[44px] items-start gap-3 break-all text-lg font-semibold text-brand-ink hover:text-brand-pink-deep"
            >
              <MailIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Email</span>
                {business.email}
              </span>
            </a>

            <div className="flex items-start gap-3 text-lg font-semibold text-brand-ink">
              <MapPinIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Service Area</span>
                {contact.serviceAreaDescription}
              </span>
            </div>

            <div className="flex items-start gap-3 text-lg font-semibold text-brand-ink">
              <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
              <span>
                <span className="block font-heading font-bold">Hours</span>
                {contact.hoursNote}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-brand-ink">
              Send Us a Message
            </h2>
            <div className="mt-6">
              <InquiryForm type="general" submitLabel="Send Message" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
