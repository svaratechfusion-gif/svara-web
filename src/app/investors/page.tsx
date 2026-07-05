import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  InvestorsHero,
  InvestorsThesis,
  InvestorsMarketOpportunity,
  InvestorsWhyNow,
  InvestorsCompetitiveAdvantage,
  InvestorsGrowthVision,
  InvestorsContact,
} from "@/sections/investors-page";

export const metadata: Metadata = {
  title: "SVARA Investors | Enterprise AI Investment Opportunity",
  description:
    "Explore investment opportunities with SVARA TechFusion, a deep-tech AI infrastructure startup building enterprise intelligence systems.",
  keywords: [
    "AI startup investment",
    "enterprise AI startup India",
    "SVARA investors",
    "invest in AI startup India",
    "AI startup Hyderabad funding",
    "AI investment opportunity",
    "enterprise AI infrastructure startup",
    "deep tech investment India",
  ],
  alternates: {
    canonical: "/investors",
  },
  openGraph: {
    title: "SVARA Investors | Enterprise AI Investment Opportunity",
    description:
      "Explore investment opportunities with SVARA TechFusion, a deep-tech AI infrastructure startup building enterprise intelligence systems.",
    url: "/investors",
    type: "website",
  },
};

// Note: schema.org's FinancialService type implies a regulated financial
// entity, which doesn't fit a tech startup — Organization is used instead.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SVARA TechFusion Private Limited",
  url: "https://www.svaratechfusion.com/investors",
};

export default function InvestorsPage() {
  return (
    <>
      <Navbar />
      <InvestorsHero />
      <InvestorsThesis />
      <InvestorsMarketOpportunity />
      <InvestorsWhyNow />
      <InvestorsCompetitiveAdvantage />
      <InvestorsGrowthVision />
      <InvestorsContact />
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
