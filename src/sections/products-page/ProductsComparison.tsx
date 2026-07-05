import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const ROWS = [
  { capability: "Perception", products: "Vision AI, Drone AI, Edge AI" },
  { capability: "Intelligence", products: "Gen AI, AI Agents" },
  { capability: "Simulation", products: "Digital Twin" },
  { capability: "Orchestration", products: "AI OS" },
  { capability: "Enterprise Operations", products: "Cloud, Command Center" },
];

export default function ProductsComparison() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Built As A Connected Product Ecosystem
        </h2>

        <div
          className="mt-10 overflow-hidden rounded-3xl border shadow-card"
          style={{ borderColor: "rgba(220,230,242,0.8)" }}
        >
          {ROWS.map((row, i) => (
            <div
              key={row.capability}
              className="grid grid-cols-2 gap-4 px-6 py-4"
              style={{
                background: i % 2 === 0 ? "white" : "var(--tint)",
              }}
            >
              <span className="text-sm font-bold" style={{ color: "#1D2E6D" }}>
                {row.capability}
              </span>
              <span className="text-sm" style={{ color: "#5D8FBE" }}>
                {row.products}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
