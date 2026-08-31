import type { Metadata } from "next";
import client from "@tina/__generated__/client";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Our North Carolina Home Care Team",
  description:
    "Contact Witherspoon Home Care at 336-842-9744 or witherspoonhomecare@gmail.com. Serving Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC with non-medical in-home care for seniors.",
};

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([
    client.queries.contact({ relativePath: "contact.json" }),
    client.queries.settings({ relativePath: "settings.json" }),
  ]);

  return (
    <ContactPageClient
      query={contact.query}
      variables={contact.variables}
      data={contact.data}
      settings={settings.data.settings}
    />
  );
}
