import type { Metadata } from "next";
import client from "@tina/__generated__/client";
import { HomePageClient } from "./HomePageClient";

export const metadata: Metadata = {
  title: "Witherspoon Home Care | Home Care in Forsyth, Guilford, Davie & More NC Counties",
  description:
    "Trusted, family-owned home care and home health aides across Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC, including Winston-Salem. Companion care, medication reminders, meal prep, and daily support. Call 336-842-9744.",
};

export default async function HomePage() {
  const [home, settings, services] = await Promise.all([
    client.queries.home({ relativePath: "home.json" }),
    client.queries.settings({ relativePath: "settings.json" }),
    client.queries.services({ relativePath: "services.json" }),
  ]);

  return (
    <HomePageClient
      homeQuery={home.query}
      homeVariables={home.variables}
      homeData={home.data}
      settings={settings.data.settings}
      highlightServices={(services.data.services.services ?? [])
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .slice(0, 4)}
    />
  );
}
