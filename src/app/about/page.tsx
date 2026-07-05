import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  AboutHero,
  AboutCompanyStory,
  AboutMission,
  AboutVision,
  AboutCoreValues,
  AboutFounders,
  AboutWhySvara,
  AboutMilestones,
  AboutFutureRoadmap,
} from "@/sections/about-page";

export const metadata: Metadata = {
  title: "About SVARA TechFusion | AI Infrastructure Company",
  description:
    "Learn about SVARA TechFusion, an AI-native enterprise infrastructure company building intelligent systems for the future of industry.",
  keywords: [
    "about SVARA",
    "SVARA TechFusion company",
    "AI infrastructure company",
    "enterprise AI startup India",
    "What is SVARA?",
    "Who founded SVARA TechFusion?",
    "AI startup in Hyderabad",
    "AI-native enterprise infrastructure company",
    "enterprise intelligence platform",
    "deep-tech startup India",
    "industrial AI ecosystem",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About SVARA TechFusion | AI Infrastructure Company",
    description:
      "Learn about SVARA TechFusion, an AI-native enterprise infrastructure company building intelligent systems for the future of industry.",
    url: "/about",
    type: "website",
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About SVARA TechFusion",
  url: "https://www.svaratechfusion.com/about",
  description:
    "Learn about SVARA TechFusion, an AI-native enterprise infrastructure company building intelligent systems for the future of industry.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutCompanyStory />
      <AboutMission />
      <AboutVision />
      <AboutCoreValues />
      <AboutFounders />
      <AboutWhySvara />
      <AboutMilestones />
      <AboutFutureRoadmap />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
