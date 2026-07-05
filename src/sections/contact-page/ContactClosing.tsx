import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ContactClosing() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Engineering Intelligence
          <br />
          For The Future
          <br />
          Of Industry
        </h2>
      </Reveal>
    </Section>
  );
}
