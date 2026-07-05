import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  CareersHero,
  CareersWhyJoin,
  CareersCulture,
  CareersOpenRoles,
  CareersHiringProcess,
  CareersBenefits,
} from "@/sections/careers-page";

export const metadata: Metadata = {
  title: "Careers at SVARA | Join Our AI Team",
  description:
    "Explore career opportunities at SVARA TechFusion and help build the future of enterprise AI infrastructure.",
  keywords: [
    "AI jobs India",
    "careers at SVARA",
    "machine learning jobs Hyderabad",
    "AI startup jobs Hyderabad",
    "deep tech careers India",
    "AI engineering careers",
    "enterprise AI startup hiring",
    "machine learning roles",
  ],
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at SVARA | Join Our AI Team",
    description:
      "Explore career opportunities at SVARA TechFusion and help build the future of enterprise AI infrastructure.",
    url: "/careers",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SVARA TechFusion Private Limited",
  url: "https://www.svaratechfusion.com/careers",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <CareersHero />
      <CareersWhyJoin />
      <CareersCulture />
      <CareersOpenRoles />
      <CareersHiringProcess />
      <CareersBenefits />
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
