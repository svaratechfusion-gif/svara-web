import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  IndustriesPageHero,
  IndustriesPageIntro,
  IndustriesPageDetail,
  IndustriesPageAdvantages,
  IndustriesPageCaseStudies,
  IndustriesPageFinalCta,
} from "@/sections/industries-page";

export const metadata: Metadata = {
  title: "SVARA Industries | AI Solutions for Manufacturing, Agriculture & Logistics",
  description:
    "Explore SVARA industry solutions for manufacturing, agriculture, logistics, healthcare, smart cities, retail, and energy using enterprise AI infrastructure.",
  keywords: [
    "AI solutions for manufacturing",
    "AI in agriculture",
    "logistics AI platform",
    "smart city AI solutions",
    "retail intelligence platform",
    "industrial AI solutions India",
    "enterprise AI industry solutions",
  ],
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "SVARA Industries | AI Solutions for Manufacturing, Agriculture & Logistics",
    description:
      "Explore SVARA industry solutions for manufacturing, agriculture, logistics, healthcare, smart cities, retail, and energy using enterprise AI infrastructure.",
    url: "/industries",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Industry-Specific AI Solutions",
  provider: {
    "@type": "Organization",
    name: "SVARA TechFusion",
  },
  description:
    "Domain-aware AI infrastructure tailored for manufacturing, agriculture, logistics, healthcare, smart cities, retail, and energy.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which industries does SVARA serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA serves manufacturing, agriculture, logistics, healthcare, smart cities, retail, and energy & utilities.",
      },
    },
    {
      "@type": "Question",
      name: "Can SVARA build custom industry AI solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SVARA's AI-native ecosystem adapts to industry-specific infrastructure, workflows, and operational challenges.",
      },
    },
    {
      "@type": "Question",
      name: "Does SVARA support manufacturing AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SVARA offers manufacturing intelligence including PPE compliance detection, quality inspection, defect detection, predictive maintenance, and downtime monitoring using Vision AI, Digital Twin, Command Center, and AI Agents.",
      },
    },
  ],
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <IndustriesPageHero />
      <IndustriesPageIntro />
      <IndustriesPageDetail />
      <IndustriesPageAdvantages />
      <IndustriesPageCaseStudies />
      <IndustriesPageFinalCta />
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
