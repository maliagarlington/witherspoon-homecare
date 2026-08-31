import { Container } from "./Container";
import { MapPinIcon } from "./icons";

// A bold, brand-color callout band for the service area, meant to be far
// more scannable than a plain text line. Deliberately not an actual county
// map graphic: an accurate NC county outline needs real geographic path
// data this project doesn't have, and a stylized-but-inaccurate map would
// misrepresent the service area, which is worse than not having one.
//
// White section background (part of the sitewide pink/white alternation);
// pink is used only as an accent here (badge, county chips), not as the
// section fill.
export function ServiceAreaBand({
  heading,
  description,
  primaryCity,
  counties,
  fieldAttrs,
}: {
  heading: string;
  description: string;
  primaryCity: string;
  counties: string[];
  fieldAttrs?: { heading?: string; description?: string };
}) {
  return (
    <section
      aria-labelledby="service-area-heading"
      className="bg-white py-14 sm:py-20"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink-tint px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-brand-pink-deep">
            <MapPinIcon className="h-4 w-4" />
            Areas We Serve
          </span>
          <h2
            id="service-area-heading"
            data-tina-field={fieldAttrs?.heading}
            className="mt-4 font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl"
          >
            {heading}
          </h2>
          <p
            data-tina-field={fieldAttrs?.description}
            className="mt-3 text-lg text-brand-slate"
          >
            {description || `Including ${primaryCity} and the surrounding communities.`}
          </p>
        </div>

        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {counties.map((county) => (
            <li key={county}>
              <span className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-pink-deep px-5 py-2.5 text-lg font-bold text-white">
                {county} County
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
