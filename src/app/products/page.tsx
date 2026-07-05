import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  ProductsHero,
  ProductsIntro,
  ProductsPillars,
  ProductsComparison,
  ProductsDeployment,
  ProductsBenefits,
  ProductsFinalCta,
} from "@/sections/products-page";

export const metadata: Metadata = {
  title: "SVARA Products | Vision AI, Digital Twin, AI Agents & AI OS",
  description:
    "Explore SVARA products including Vision AI, Drone AI, Digital Twin, AI Agents, AI OS, and Unified Business Cloud for enterprise intelligence.",
  keywords: [
    "SVARA products",
    "Vision AI platform",
    "Digital Twin software",
    "AI agents platform",
    "AI operating system",
    "enterprise AI products",
    "industrial AI solutions",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "SVARA Products | Vision AI, Digital Twin, AI Agents & AI OS",
    description:
      "Explore SVARA products including Vision AI, Drone AI, Digital Twin, AI Agents, AI OS, and Unified Business Cloud for enterprise intelligence.",
    url: "/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <ProductsHero />
      <ProductsIntro />
      <ProductsPillars />
      <ProductsComparison />
      <ProductsDeployment />
      <ProductsBenefits />
      <ProductsFinalCta />
      <Footer />
    </>
  );
}
