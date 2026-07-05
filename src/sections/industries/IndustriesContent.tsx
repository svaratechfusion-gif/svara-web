import { Factory, Sprout, HeartPulse, Truck, ShoppingBag, Building2 } from "lucide-react";

// TODO: swap these icons for the real PNGs once public/images/industries/<slug>/ is populated.
const INDUSTRIES = [
  { name: "Manufacturing", slug: "manufacturing", icon: Factory },
  { name: "Agriculture", slug: "agriculture", icon: Sprout },
  { name: "Logistics", slug: "logistics", icon: Truck },
  { name: "Healthcare", slug: "healthcare", icon: HeartPulse },
  { name: "Smart Cities", slug: "smart-city", icon: Building2 },
  { name: "Retail", slug: "retail", icon: ShoppingBag },
];

export default function IndustriesContent() {
  return (
    <div className="relative z-10">
      <p
        className="text-center text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5D8FBE" }}
      >
        Industries
      </p>
      <h2
        className="text-cinematic-heading mt-4 text-center"
        style={{ color: "#1D2E6D" }}
      >
        Intelligence Across
        <br />
        Every Industry
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((industry) => (
          <div
            key={industry.slug}
            className="flex flex-col items-center gap-4 rounded-3xl border border-[#DCE6F2] p-10 text-center shadow-card transition-all duration-300 hover:glow-lift"
            style={{
              background: "rgba(255,255,255,0.7)",
            }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
            >
              <industry.icon size={28} color="white" />
            </div>
            <h3 className="text-lg font-bold" style={{ color: "#1D2E6D" }}>
              {industry.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
