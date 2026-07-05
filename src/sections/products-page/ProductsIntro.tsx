import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ProductsIntro() {
  return (
    <Section size="medium" className="bg-white text-center">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          From Perception To Prediction
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Modern enterprises need more than isolated software tools. They
          need intelligent systems capable of perceiving signals, extracting
          insights, predicting outcomes, and triggering action.
        </p>
        <p className="mt-4 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA&apos;s product ecosystem is built to deliver exactly that.
        </p>
      </Reveal>
    </Section>
  );
}
