import Reveal from "@/components/ui/reveal";
import TrustBackground from "./TrustBackground";
import TrustContent from "./TrustContent";

export default function Trust() {
  return (
    <section className="relative overflow-hidden px-8 py-24 xl:px-12">
      <TrustBackground />
      <Reveal className="relative mx-auto max-w-[1600px]">
        <TrustContent />
      </Reveal>
    </section>
  );
}
