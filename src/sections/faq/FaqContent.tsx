const FAQS = [
  {
    question: "What is SVARA TechFusion?",
    answer:
      "SVARA TechFusion is a deep-tech AI company building enterprise intelligence infrastructure including Vision AI, Digital Twins, AI Agents, and intelligent automation systems.",
  },
  {
    question: "What industries does SVARA serve?",
    answer:
      "SVARA serves manufacturing, agriculture, logistics, healthcare, smart cities, and retail.",
  },
  {
    question: "What products does SVARA offer?",
    answer:
      "SVARA offers Vision AI, Drone AI, Digital Twins, AI Agents, AI OS, and Unified Business Cloud solutions.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqContent() {
  return (
    <div className="relative z-10">
      <p
        className="text-center text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5D8FBE" }}
      >
        FAQ
      </p>
      <h2
        className="mt-6 text-center text-3xl font-extrabold lg:text-4xl"
        style={{ color: "#1D2E6D" }}
      >
        Frequently Asked Questions
      </h2>

      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
        {FAQS.map((faq) => (
          <div
            key={faq.question}
            className="rounded-2xl border p-6 shadow-card"
            style={{
              background: "rgba(255,255,255,0.8)",
              borderColor: "rgba(220,230,242,0.8)",
            }}
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
