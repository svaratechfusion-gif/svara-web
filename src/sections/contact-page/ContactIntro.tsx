import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ContactIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Every Transformation Starts With A Conversation
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Building intelligent infrastructure begins with understanding your
          business, systems, challenges, and opportunities. Our team works
          closely with enterprises and partners to design AI-driven
          transformation strategies tailored to real-world operations.
        </p>
      </Reveal>
    </Section>
  );
}
