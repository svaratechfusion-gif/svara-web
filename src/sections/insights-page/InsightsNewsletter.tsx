import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function InsightsNewsletter() {
  return (
    <Section
      size="medium"
      className="text-center"
      style={{ background: "var(--tint)" }}
    >
      <Reveal className="relative mx-auto max-w-xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Stay Ahead Of
          <br />
          The Intelligence Curve
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Receive curated insights on AI, automation, digital twins, and
          enterprise transformation.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="rounded-2xl border bg-white px-5 py-4 text-sm outline-none"
            style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-2xl border bg-white px-5 py-4 text-sm outline-none"
            style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
          />
          <input
            type="text"
            placeholder="Industry"
            className="rounded-2xl border bg-white px-5 py-4 text-sm outline-none"
            style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
          />
          <button
            type="button"
            className="btn-glow-pulse rounded-2xl px-8 py-4 text-lg font-bold text-white shadow-card transition-all duration-300 hover:scale-105 hover:shadow-floating"
            style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
          >
            Subscribe
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
