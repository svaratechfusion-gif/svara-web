import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  ArchPageHero,
  ArchPageIntro,
  ArchPageModelIntro,
  ArchPageLayers,
  ArchPageFlow,
  ArchPageDeployment,
  ArchPageScalability,
  ArchPageIntegration,
  ArchPageSecurity,
  ArchPageAdvantages,
  ArchPageFinalCta,
} from "@/sections/architecture-page";

export const metadata: Metadata = {
  title: "SVARA Architecture | Enterprise AI Infrastructure & Intelligent Systems Stack",
  description:
    "Explore SVARA's 7-layer AI architecture stack for enterprise intelligence, including edge processing, AI orchestration, digital twins, and scalable infrastructure.",
  keywords: [
    "SVARA architecture",
    "enterprise AI architecture",
    "AI infrastructure stack",
    "intelligent systems architecture",
    "AI orchestration architecture",
    "digital twin architecture",
    "industrial AI infrastructure",
  ],
  alternates: {
    canonical: "/architecture",
  },
  openGraph: {
    title: "SVARA Architecture | Enterprise AI Infrastructure & Intelligent Systems Stack",
    description:
      "Explore SVARA's 7-layer AI architecture stack for enterprise intelligence, including edge processing, AI orchestration, digital twins, and scalable infrastructure.",
    url: "/architecture",
    type: "website",
  },
};

const techArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Architecture Built For Planet-Scale Intelligence",
  description:
    "SVARA's seven-layer AI-native architecture stack spanning physical intelligence, edge processing, data fusion, intelligence engines, simulation, orchestration, and experience.",
  author: {
    "@type": "Organization",
    name: "SVARA TechFusion",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Enterprise AI Architecture",
  provider: {
    "@type": "Organization",
    name: "SVARA TechFusion",
  },
  description:
    "A modular seven-layer AI architecture stack for enterprise intelligence, from data capture to autonomous action.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the SVARA architecture stack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA operates through a modular seven-layer architecture that transforms raw signals into intelligent actions and continuous learning, spanning physical intelligence, edge processing, data fusion, intelligence engines, simulation, orchestration, and experience.",
      },
    },
    {
      "@type": "Question",
      name: "How many layers are in SVARA architecture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA architecture consists of seven layers: Physical Intelligence, Edge Processing, Data Fusion, Intelligence Engine, Simulation, Orchestration, and Experience.",
      },
    },
    {
      "@type": "Question",
      name: "Does SVARA support cloud and edge deployment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SVARA supports cloud, hybrid, and on-premises deployment models, combining cloud infrastructure with edge intelligence where needed.",
      },
    },
  ],
};

export default function ArchitecturePage() {
  return (
    <>
      <Navbar />
      <ArchPageHero />
      <ArchPageIntro />
      <ArchPageModelIntro />
      <ArchPageLayers />
      <ArchPageFlow />
      <ArchPageDeployment />
      <ArchPageScalability />
      <ArchPageIntegration />
      <ArchPageSecurity />
      <ArchPageAdvantages />
      <ArchPageFinalCta />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(techArticleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
