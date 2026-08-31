import type { Metadata } from "next";
import client from "@tina/__generated__/client";
import { reviewSchema, jsonLdScript } from "@/lib/schema";
import { TestimonialsPageClient } from "./TestimonialsPageClient";

export const metadata: Metadata = {
  title: "Family Reviews of Our North Carolina Home Care",
  description:
    "What families across Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC say about the home care and companion care they've received from Witherspoon Home Care.",
};

export default async function TestimonialsPage() {
  const [testimonials, settings] = await Promise.all([
    client.queries.testimonials({ relativePath: "testimonials.json" }),
    client.queries.settings({ relativePath: "settings.json" }),
  ]);

  const list = (testimonials.data.testimonials.testimonials ?? [])
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .map((t) => ({ quote: t.quote ?? "", author: t.author ?? "" }));
  const schema = reviewSchema(list);

  return (
    <>
      <TestimonialsPageClient
        query={testimonials.query}
        variables={testimonials.variables}
        data={testimonials.data}
        settings={settings.data.settings}
      />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(schema)}
        />
      )}
    </>
  );
}
