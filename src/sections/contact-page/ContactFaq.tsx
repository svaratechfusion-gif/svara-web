import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const FAQS = [
  {
    question: "How do I book a demo with SVARA?",
    answer: "You can submit the consultation form or contact our team directly to schedule a product demonstration.",
  },
  {
    question: "Does SVARA build custom AI solutions?",
    answer: "Yes. SVARA designs custom enterprise AI systems based on industry requirements, infrastructure, and business goals.",
  },
  {
    question: "Which industries does SVARA serve?",
    answer: "SVARA serves manufacturing, agriculture, logistics, healthcare, smart cities, retail, and other enterprise sectors.",
  },
  {
    question: "Does SVARA support global clients?",
    answer: "Yes. SVARA's architecture supports regional and global enterprise deployments.",
  },
];

export default function ContactFaq() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {FAQS.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border bg-white p-6 shadow-card"
              style={{ borderColor: "rgba(220,230,242,0.8)" }}
            >
              <h3 className="text-base font-bold" style={{ color: "#1D2E6D" }}>
                {faq.question}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "#5D8FBE" }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
