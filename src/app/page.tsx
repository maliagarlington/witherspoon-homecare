import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { VideoHero } from "@/components/VideoHero";
import { ServiceAreaBand } from "@/components/ServiceAreaBand";
import { PhoneIcon, CheckCircleIcon } from "@/components/icons";
import { business, whyChooseUs } from "@/content/site-content";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Witherspoon Home Care | Home Care in Forsyth, Guilford, Davie & More NC Counties",
  description:
    "Trusted, family-owned home care and home health aides across Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC, including Winston-Salem. Companion care, medication reminders, meal prep, and daily support. Call 336-842-9744.",
};

const highlightServices = services.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <VideoHero />

      <ServiceAreaBand />

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl">
              Why Families Choose Us
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-2xl border border-brand-pink-tint-2 bg-white p-6 shadow-sm"
              >
                <CheckCircleIcon className="mt-0.5 h-6 w-6 shrink-0 text-brand-pink-deep" />
                <span className="text-brand-ink">
                  <span className="font-bold">{item.title}.</span>{" "}
                  <span className="text-brand-slate">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-label="Trust signals" className="border-y border-brand-pink-tint-2 bg-white py-8">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
          <p className="font-heading text-lg font-bold text-brand-ink">
            Family-Owned &amp; Operated
          </p>
          <p className="font-heading text-lg font-bold text-brand-ink">
            Personalized One-on-One Care
          </p>
          <p className="font-heading text-lg font-bold text-brand-ink">
            Serving {business.serviceArea}
          </p>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl">
              How We Help
            </h2>
            <p className="mt-3 text-lg text-brand-slate">
              A few of the ways our caregivers support daily life at home. See{" "}
              <Link
                href="/services"
                className="font-bold text-brand-pink-deep underline underline-offset-4"
              >
                our full list of home care services across North Carolina
              </Link>
              , or read about{" "}
              <Link
                href="/about"
                className="font-bold text-brand-pink-deep underline underline-offset-4"
              >
                our family-owned home care agency
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlightServices.map((service) => (
              <ServiceCard key={service.slug} service={service} compact />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/services" variant="secondary">
              See All Services
            </Button>
          </div>
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl">
            Hear From Families We&rsquo;ve Helped
          </h2>
          <p className="mt-4 text-lg text-brand-slate">
            We&rsquo;re gathering our first family stories now. In the meantime,
            call us and we&rsquo;re happy to talk through how we can support your
            family, or connect you with a reference.
          </p>
          <div className="mt-6">
            <Link
              href="/testimonials"
              className="text-lg font-bold text-brand-pink-deep underline underline-offset-4"
            >
              Visit our Testimonials page
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-brand-pink-tint py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl">
            Let Us Be the Extra Set of Hands You Can Trust
          </h2>
          <p className="max-w-xl text-lg text-brand-slate">
            Request a free consultation and we&rsquo;ll help you figure out the
            right kind of support for your family.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="gold">
              Request a Consultation
            </Button>
            {/* variant="secondary" now, not "outline-light": that variant
                is transparent-with-white-text/border, which only works on
                a dark background. This section is light pink now, so a
                white-on-white button would be invisible. */}
            <Button
              href={business.phoneHref}
              variant="secondary"
              icon={<PhoneIcon className="h-5 w-5" />}
            >
              Call {business.phone}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
