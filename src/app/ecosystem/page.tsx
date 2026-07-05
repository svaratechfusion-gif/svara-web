import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  EcosystemHero,
  EcosystemIntro,
  EcosystemCore,
  EcosystemLayers,
  EcosystemFlow,
  EcosystemIntegrations,
  EcosystemBenefits,
  EcosystemUseCases,
  EcosystemFinalCta,
} from "@/sections/ecosystem-page";

export const metadata: Metadata = {
  title: "SVARA Ecosystem | AI Intelligence Operating System for Enterprises",
  description:
    "Explore the SVARA AI ecosystem powering enterprise intelligence through Vision AI, Digital Twins, AI Agents, automation, and real-time decision systems.",
  keywords: [
    "SVARA ecosystem",
    "AI ecosystem platform",
    "enterprise AI ecosystem",
    "AI operating system",
    "intelligent automation ecosystem",
    "industrial AI ecosystem",
    "AI infrastructure platform",
  ],
  alternates: {
    canonical: "/ecosystem",
  },
  openGraph: {
    title: "SVARA Ecosystem | AI Intelligence Operating System for Enterprises",
    description:
      "Explore the SVARA AI ecosystem powering enterprise intelligence through Vision AI, Digital Twins, AI Agents, automation, and real-time decision systems.",
    url: "/ecosystem",
    type: "website",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Ecosystem Platform",
  provider: {
    "@type": "Organization",
    name: "SVARA TechFusion",
  },
  description:
    "A unified AI ecosystem connecting perception, intelligence, automation, simulation, and enterprise operations.",
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SVARA AI OS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Cloud",
  description:
    "The orchestration engine at the center of the SVARA ecosystem, connecting data, AI models, simulations, workflows, and business systems.",
};

export default function EcosystemPage() {
  return (
    <>
      <Navbar />
      <EcosystemHero />
      <EcosystemIntro />
      <EcosystemCore />
      <EcosystemLayers />
      <EcosystemFlow />
      <EcosystemIntegrations />
      <EcosystemBenefits />
      <EcosystemUseCases />
      <EcosystemFinalCta />
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
          __html: JSON.stringify(softwareApplicationJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}
