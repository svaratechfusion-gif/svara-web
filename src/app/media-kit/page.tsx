import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { MediaKitHero, MediaKitDownloads } from "@/sections/media-kit-page";

export const metadata: Metadata = {
  title: "SVARA Media Kit | Logos, Press Assets & Brand Guidelines",
  description:
    "Download SVARA logos, press kit, founder assets, brand guidelines, and media resources.",
  keywords: [
    "media kit",
    "brand assets",
    "press resources",
    "AI company media kit",
    "startup press resources India",
    "company press kit",
    "AI startup brand assets",
    "enterprise AI media resources",
  ],
  alternates: {
    canonical: "/media-kit",
  },
  openGraph: {
    title: "SVARA Media Kit | Logos, Press Assets & Brand Guidelines",
    description:
      "Download SVARA logos, press kit, founder assets, brand guidelines, and media resources.",
    url: "/media-kit",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SVARA TechFusion Private Limited",
  url: "https://www.svaratechfusion.com/media-kit",
  logo: "https://www.svaratechfusion.com/logo.png",
};

export default function MediaKitPage() {
  return (
    <>
      <Navbar />
      <MediaKitHero />
      <MediaKitDownloads />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
