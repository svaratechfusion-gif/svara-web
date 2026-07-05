import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const SITE_URL = "https://www.svaratechfusion.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SVARA TechFusion | Enterprise AI & Industrial Intelligence Platform",
  description:
    "SVARA TechFusion builds AI-native enterprise infrastructure including Vision AI, Digital Twins, AI Agents, and intelligent automation platforms for modern industries.",
  keywords: [
    "SVARA TechFusion",
    "enterprise AI",
    "industrial AI",
    "Vision AI",
    "digital twin",
    "AI agents",
    "AI OS",
    "AI automation",
    "deep tech startup India",
    "AI company Hyderabad",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SVARA TechFusion | Engineering Intelligence for the Future of Industry",
    description:
      "AI-native enterprise infrastructure for automation, simulation, and intelligent decision systems.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVARA TechFusion",
    description: "Enterprise AI infrastructure for modern industry.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SVARA TechFusion Private Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "AI-native enterprise infrastructure company",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SVARA TechFusion",
  url: SITE_URL,
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Enterprise AI Infrastructure",
  provider: {
    "@type": "Organization",
    name: "SVARA TechFusion",
  },
  areaServed: "IN",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SVARA Products",
    itemListElement: ["Vision AI", "Digital Twin", "AI Agents", "AI OS"].map(
      (name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })
    ),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
