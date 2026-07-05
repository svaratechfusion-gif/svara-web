import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { FaqHero, FaqCategories } from "@/sections/faq-page";

export const metadata: Metadata = {
  title: "SVARA FAQ | Questions About Products, AI Solutions & Services",
  description:
    "Find answers to common questions about SVARA TechFusion, products, enterprise AI solutions, APIs, and services.",
  keywords: [
    "SVARA FAQ",
    "enterprise AI questions",
    "AI solutions company FAQ",
    "AI solutions FAQ India",
    "enterprise AI company questions",
    "AI company frequently asked questions",
    "enterprise AI platform FAQ",
    "industrial AI solutions FAQ",
  ],
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "SVARA FAQ | Questions About Products, AI Solutions & Services",
    description:
      "Find answers to common questions about SVARA TechFusion, products, enterprise AI solutions, APIs, and services.",
    url: "/faqs",
    type: "website",
  },
};

// Only questions with confirmed real answers are included here — two
// questions on the page ("Does SVARA offer APIs?", "Is SVARA raising
// funds?") don't have a sourced answer yet and are deliberately left out
// of structured data rather than seeded with a placeholder.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SVARA TechFusion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA TechFusion is an AI-native enterprise infrastructure company building intelligent systems for industrial transformation.",
      },
    },
    {
      "@type": "Question",
      name: "Where is SVARA based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA TechFusion is headquartered in Hyderabad, Telangana, India.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries does SVARA serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Manufacturing, agriculture, healthcare, logistics, retail, and smart cities.",
      },
    },
    {
      "@type": "Question",
      name: "What products does SVARA offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA offers 11 products: Vision AI, Drone AI, Edge AI, Gen AI, AI Agents, Digital Twin, AI OS, Command Center, Unified Business Cloud, Digital Engineering, and Growth Tech.",
      },
    },
    {
      "@type": "Question",
      name: "Does SVARA build custom AI solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SVARA provides custom AI infrastructure and product implementations.",
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <FaqHero />
      <FaqCategories />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
