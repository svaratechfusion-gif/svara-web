import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  DivisionsHero,
  DivisionsIntro,
  DivisionsDetail,
  DivisionsSynergy,
  DivisionsWhyModel,
  DivisionsFinalCta,
} from "@/sections/divisions-page";

export const metadata: Metadata = {
  title: "SVARA Divisions | AI, Digital Twin, SaaS & Enterprise Engineering",
  description:
    "Explore SVARA's six specialized divisions spanning AI, Digital Twins, SaaS, AI OS, Digital Engineering, and Growth Tech for enterprise transformation.",
  keywords: [
    "SVARA divisions",
    "AI divisions company",
    "enterprise AI engineering",
    "digital twin consulting",
    "AI OS platform",
    "enterprise SaaS development",
    "AI software engineering",
  ],
  alternates: {
    canonical: "/divisions",
  },
  openGraph: {
    title: "SVARA Divisions | AI, Digital Twin, SaaS & Enterprise Engineering",
    description:
      "Explore SVARA's six specialized divisions spanning AI, Digital Twins, SaaS, AI OS, Digital Engineering, and Growth Tech for enterprise transformation.",
    url: "/divisions",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Enterprise Technology Divisions",
  provider: {
    "@type": "Organization",
    name: "SVARA TechFusion",
  },
  description:
    "Six specialized divisions spanning AI, Digital Twins, SaaS, AI OS, Digital Engineering, and Growth Tech.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What divisions does SVARA operate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA operates through six divisions: Deep Tech & AI Lab, Digital Twin Lab, SaaS Studio, AI OS Division, Digital Engineering, and Growth & PR Tech.",
      },
    },
    {
      "@type": "Question",
      name: "Why does SVARA use a division model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The division model enables specialized expertise while maintaining integrated enterprise execution.",
      },
    },
  ],
};

export default function DivisionsPage() {
  return (
    <>
      <Navbar />
      <DivisionsHero />
      <DivisionsIntro />
      <DivisionsDetail />
      <DivisionsSynergy />
      <DivisionsWhyModel />
      <DivisionsFinalCta />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
