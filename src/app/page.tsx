import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/sections/hero";
import SvaraModules from "@/sections/svara-modules";
import Problem from "@/sections/problem";
import WhySvara from "@/sections/why-svara";
import Ecosystem from "@/sections/ecosystem";
import Architecture from "@/sections/architecture";
import Industries from "@/sections/industries";
import Cta from "@/sections/cta";

// Homepage scene flow:
// Hero (Boot Sequence) -> Problem (Industry Chaos) -> WhySvara (SVARA Awakens)
// -> Ecosystem (Orbital Model) -> Industries (Use Cases) -> Architecture (Stack) -> Cta
// Trust/Divisions/Products/Blogs/Founders/Faq have their own dedicated routes
// (see the *-page section variants) and are no longer duplicated on the home flow.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SvaraModules />
      <Problem />
      <WhySvara />
      <Ecosystem />
      <Industries />
      <Architecture />
      <Cta />
      <Footer />
    </>
  );
}
