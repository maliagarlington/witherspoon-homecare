import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { CheckCircleIcon, PhoneIcon } from "@/components/icons";
import { about, business } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Witherspoon Home Care is a family-owned in-home care agency serving Forsyth County, NC. Learn about our story, our mission, and how we screen every caregiver.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            About Witherspoon Home Care
          </h1>
          <p className="mt-6 text-xl text-brand-ink">{about.intro}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            Our Story
          </h2>
          <p className="mt-4 rounded-2xl border-2 border-dashed border-brand-pink-tint-2 bg-brand-pink-tint p-6 text-lg text-brand-slate">
            {about.founderStoryPlaceholder}
          </p>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-brand-ink">{about.mission}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink">
            How We Choose Our Caregivers
          </h2>
          <p className="mt-4 text-lg text-brand-slate">
            Families trust us with the people they love most, so we take
            hiring seriously.
          </p>
          <ul className="mt-6 flex flex-col gap-4">
            {about.hiringProcess.map((step) => (
              <li key={step} className="flex gap-3">
                <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
                <span className="text-lg text-brand-ink">{step}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base text-brand-slate">{about.hiringNote}</p>
        </Container>
      </section>

      <section className="bg-brand-plum py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Have Questions About Our Team?
          </h2>
          <Button
            href={business.phoneHref}
            variant="gold"
            icon={<PhoneIcon className="h-5 w-5" />}
          >
            Call {business.phone}
          </Button>
        </Container>
      </section>
    </>
  );
}
