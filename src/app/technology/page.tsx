import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  TechnologyHero,
  TechnologyIntro,
  TechnologyPhilosophy,
  TechnologyPillars,
  TechnologyDataPipeline,
  TechnologySecurity,
  TechnologyPerformance,
  TechnologyIntegrations,
  TechnologyAdvantage,
  TechnologyFinalCta,
} from "@/sections/technology-page";

export const metadata: Metadata = {
  title: "SVARA Technology | Enterprise AI, Edge Computing & Digital Twin Stack",
  description:
    "Explore SVARA's enterprise AI technology stack including computer vision, machine learning, generative AI, edge computing, orchestration, and digital twin systems.",
  keywords: [
    "SVARA technology",
    "enterprise AI technology",
    "AI technology stack",
    "edge AI infrastructure",
    "digital twin technology",
    "AI orchestration platform",
    "industrial AI technology",
  ],
  alternates: {
    canonical: "/technology",
  },
  openGraph: {
    title: "SVARA Technology | Enterprise AI, Edge Computing & Digital Twin Stack",
    description:
      "Explore SVARA's enterprise AI technology stack including computer vision, machine learning, generative AI, edge computing, orchestration, and digital twin systems.",
    url: "/technology",
    type: "website",
  },
};

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <TechnologyHero />
      <TechnologyIntro />
      <TechnologyPhilosophy />
      <TechnologyPillars />
      <TechnologyDataPipeline />
      <TechnologySecurity />
      <TechnologyPerformance />
      <TechnologyIntegrations />
      <TechnologyAdvantage />
      <TechnologyFinalCta />
      <Footer />
    </>
  );
}
