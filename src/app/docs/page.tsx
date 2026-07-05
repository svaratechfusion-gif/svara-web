import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { DocumentationHero, DocumentationCategories } from "@/sections/docs-page";

export const metadata: Metadata = {
  title: "SVARA Documentation | APIs, SDKs & Integration Guides",
  description:
    "Read SVARA technical documentation including APIs, SDKs, integrations, architecture, and deployment guides.",
  keywords: [
    "AI API documentation",
    "enterprise AI APIs",
    "SVARA docs",
    "AI API documentation India",
    "enterprise AI developer docs",
    "AI developer documentation",
    "AI orchestration API",
    "enterprise AI SDK",
  ],
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "SVARA Documentation | APIs, SDKs & Integration Guides",
    description:
      "Read SVARA technical documentation including APIs, SDKs, integrations, architecture, and deployment guides.",
    url: "/docs",
    type: "website",
  },
};

// TechArticle and SoftwareApplication schema both require real content
// (article body, applicationCategory, operatingSystem, offers, etc.) that
// doesn't exist yet — using Organization instead of fabricating those fields.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SVARA TechFusion Private Limited",
  url: "https://www.svaratechfusion.com/docs",
};

export default function DocumentationPage() {
  return (
    <>
      <Navbar />
      <DocumentationHero />
      <DocumentationCategories />
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
