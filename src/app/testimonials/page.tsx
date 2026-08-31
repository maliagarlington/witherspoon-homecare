import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { TestimonialCard } from "@/components/TestimonialCard";
import { PhoneIcon } from "@/components/icons";
import { business, testimonials } from "@/content/site-content";
import { reviewSchema, jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What families in Forsyth County, NC say about the care and support they've received from Witherspoon Home Care.",
};

export default function TestimonialsPage() {
  const schema = reviewSchema(testimonials);

  return (
    <>
      <section className="bg-brand-pink-tint py-14 sm:py-20">
        <Container className="max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold text-brand-ink sm:text-5xl">
            What Families Say
          </h1>
          <p className="mt-6 text-xl text-brand-ink">
            We&rsquo;re proud of the trust families place in us. Here&rsquo;s
            what they have to say.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          {testimonials.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.author} quote={t.quote} author={t.author} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border-2 border-dashed border-brand-pink-tint-2 bg-brand-pink-tint p-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-brand-ink">
                We&rsquo;re Collecting Our First Family Stories
              </h2>
              <p className="mt-4 text-lg text-brand-slate">
                Testimonials from the families we serve will be posted here
                soon. In the meantime, give us a call — we&rsquo;re happy to
                talk through our approach directly, or connect you with a
                reference.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  href={business.phoneHref}
                  icon={<PhoneIcon className="h-5 w-5" />}
                >
                  Call {business.phone}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(schema)}
        />
      )}
    </>
  );
}
