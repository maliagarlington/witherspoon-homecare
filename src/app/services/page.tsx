import type { Metadata } from "next";
import client from "@tina/__generated__/client";
import { faq } from "@/content/faq";
import { faqSchema, jsonLdScript } from "@/lib/schema";
import { ServicesPageClient } from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Home Care Services Across 8 NC Counties",
  description:
    "Companion care, medication reminders, meal prep, rehab support, errands, and light housekeeping for seniors across Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC, from Witherspoon Home Care.",
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    client.queries.services({ relativePath: "services.json" }),
    client.queries.settings({ relativePath: "settings.json" }),
  ]);

  return (
    <>
      <ServicesPageClient
        query={services.query}
        variables={services.variables}
        data={services.data}
        settings={settings.data.settings}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqSchema(faq))}
      />
    </>
  );
}
