import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { InquiryForm } from "@/components/InquiryForm";
import { CheckCircleIcon } from "@/components/icons";
import { careers, business } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Witherspoon Home Care as a caregiver in Forsyth County, NC. We're always hiring compassionate, reliable caregivers — apply today.",
};

export default function CareersPage() {
  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            Join Our Care Team
          </h1>
          <p className="mt-6 text-xl text-brand-ink">{careers.intro}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            Why Work With Us
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {careers.culture.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm"
              >
                <CheckCircleIcon className="h-7 w-7 text-brand-pink-deep" />
                <h3 className="mt-3 font-heading text-xl font-bold text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-brand-slate">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-base text-brand-slate">{careers.openingsNote}</p>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="max-w-2xl">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            Apply Now
          </h2>
          <p className="mt-3 text-lg text-brand-slate">
            Tell us a bit about yourself and your availability, and we&rsquo;ll
            be in touch. You can also call us directly at {business.phone}.
          </p>
          <div className="mt-8">
            <InquiryForm type="career" submitLabel="Submit Application" />
          </div>
        </Container>
      </section>
    </>
  );
}
