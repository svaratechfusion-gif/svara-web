import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  InsightsHero,
  InsightsIntro,
  InsightsCategories,
  InsightsFeatured,
  InsightsArticles,
  InsightsResearch,
  InsightsNewsletter,
  InsightsFinalCta,
} from "@/sections/insights-page";

export const metadata: Metadata = {
  title: "SVARA Insights | AI Research, Digital Twin & Enterprise Intelligence Blog",
  description:
    "Read SVARA Insights for AI research, digital twin analysis, enterprise intelligence, automation trends, and industrial transformation strategies.",
  keywords: [
    "AI research blog",
    "enterprise AI insights",
    "digital twin articles",
    "AI agents blog",
    "industrial AI trends",
    "enterprise intelligence research",
  ],
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "SVARA Insights | AI Research, Digital Twin & Enterprise Intelligence Blog",
    description:
      "Read SVARA Insights for AI research, digital twin analysis, enterprise intelligence, automation trends, and industrial transformation strategies.",
    url: "/blogs",
    type: "website",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "SVARA Insights",
  url: "https://www.svaratechfusion.com/blogs",
  publisher: {
    "@type": "Organization",
    name: "SVARA TechFusion",
  },
  blogPost: [
    "Why AI Infrastructure Will Define The Next Industrial Revolution",
    "Digital Twins Beyond Simulation",
    "Rise of Autonomous AI Agents",
    "Computer Vision in Manufacturing",
    "Enterprise AI Adoption Challenges",
    "Future of Industrial Automation",
    "AI OS Explained",
  ].map((headline) => ({
    "@type": "BlogPosting",
    headline,
  })),
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <InsightsHero />
      <InsightsIntro />
      <InsightsCategories />
      <InsightsFeatured />
      <InsightsArticles />
      <InsightsResearch />
      <InsightsNewsletter />
      <InsightsFinalCta />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
