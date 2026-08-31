import type { Metadata } from "next";
import client from "@tina/__generated__/client";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "Family-Owned Home Care Across 8 NC Counties",
  description:
    "Witherspoon Home Care is a family-owned home care agency serving Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC. Learn about our story, our mission, and how we screen every caregiver.",
};

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    client.queries.about({ relativePath: "about.json" }),
    client.queries.settings({ relativePath: "settings.json" }),
  ]);

  return (
    <AboutPageClient
      query={about.query}
      variables={about.variables}
      data={about.data}
      settings={settings.data.settings}
    />
  );
}
