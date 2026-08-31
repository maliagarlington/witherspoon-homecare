import type { Metadata } from "next";
import client from "@tina/__generated__/client";
import { CareersPageClient } from "./CareersPageClient";

export const metadata: Metadata = {
  title: "Caregiver Opportunities Across 8 NC Counties",
  description:
    "Join Witherspoon Home Care as a caregiver serving Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC. We're always hiring compassionate, reliable home health aides. Apply today.",
};

export default async function CareersPage() {
  const [careers, settings] = await Promise.all([
    client.queries.careers({ relativePath: "careers.json" }),
    client.queries.settings({ relativePath: "settings.json" }),
  ]);

  return (
    <CareersPageClient
      query={careers.query}
      variables={careers.variables}
      data={careers.data}
      settings={settings.data.settings}
    />
  );
}
