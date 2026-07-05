import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  ContactHero,
  ContactIntro,
  ContactRouting,
  ContactBookingForm,
  ContactInfo,
  ContactMap,
  ContactAiAssistant,
  ContactFaq,
  ContactInvestorStrip,
  ContactClosing,
} from "@/sections/contact-page";

export const metadata: Metadata = {
  title: "Contact SVARA TechFusion | Book AI Demo & Enterprise Consultation",
  description:
    "Contact SVARA TechFusion to book AI product demos, enterprise consultations, partnerships, investor discussions, and custom AI solution discovery.",
  keywords: [
    "contact SVARA",
    "book AI demo",
    "enterprise AI consultation",
    "AI solution provider India",
    "custom AI solutions company",
    "AI consulting Hyderabad",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact SVARA TechFusion | Book AI Demo & Enterprise Consultation",
    description:
      "Contact SVARA TechFusion to book AI product demos, enterprise consultations, partnerships, investor discussions, and custom AI solution discovery.",
    url: "/contact",
    type: "website",
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact SVARA TechFusion",
  url: "https://www.svaratechfusion.com/contact",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SVARA TechFusion Private Limited",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  email: "contact@svaratechfusion.com",
  openingHours: "Mo-Sa 10:00-19:00",
  url: "https://www.svaratechfusion.com/contact",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I book a demo with SVARA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can submit the consultation form or contact our team directly to schedule a product demonstration.",
      },
    },
    {
      "@type": "Question",
      name: "Does SVARA build custom AI solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SVARA designs custom enterprise AI systems based on industry requirements, infrastructure, and business goals.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries does SVARA serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SVARA serves manufacturing, agriculture, logistics, healthcare, smart cities, retail, and other enterprise sectors.",
      },
    },
    {
      "@type": "Question",
      name: "Does SVARA support global clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SVARA's architecture supports regional and global enterprise deployments.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactHero />
      <ContactIntro />
      <ContactRouting />
      <ContactBookingForm />
      <ContactInfo />
      <ContactMap />
      <ContactFaq />
      <ContactInvestorStrip />
      <ContactClosing />
      <Footer />
      <ContactAiAssistant />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
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
