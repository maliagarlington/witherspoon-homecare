import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { business, siteUrl } from "@/content/site-content";
import { services } from "@/content/services";
import { organizationSchema, jsonLdScript } from "@/lib/schema";
import client from "@tina/__generated__/client";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Home Care Across 8 NC Counties`,
    template: `%s | ${business.name}`,
  },
  description:
    "Witherspoon Home Care provides compassionate, non-medical home care and home health aides across Forsyth, Guilford, Davie, Davidson, Surry, Stokes, Rockingham, and Yadkin Counties, NC, including Winston-Salem. Companion care, medication reminders, meal prep, and daily living support so families can trust their loved ones are safe at home.",
  keywords: [
    "North Carolina home care",
    "Forsyth County home care",
    "Guilford County home care",
    "Davie County home care",
    "Davidson County home care",
    "Surry County home care",
    "Stokes County home care",
    "Rockingham County home care",
    "Yadkin County home care",
    "Winston-Salem home care",
    "home health aide North Carolina",
    "in-home senior care North Carolina",
    "companion care North Carolina",
    "non-medical home care North Carolina",
    "caregiver services North Carolina",
  ],
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Fetched once here (not in a client component) since the header, footer,
  // and mobile call bar appear on every page: phone number, email, tagline,
  // logo, and the counties list all come from the "Site Settings" document
  // in Tina, so editing it there updates them everywhere at once.
  const settings = await client.queries.settings({
    relativePath: "settings.json",
  });

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-brand-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationSchema(services))}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-lg focus:font-bold focus:text-brand-pink-deep focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header settings={settings.data.settings} />
        <main id="main-content" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <Footer settings={settings.data.settings} />
        <MobileCallBar settings={settings.data.settings} />
      </body>
    </html>
  );
}
