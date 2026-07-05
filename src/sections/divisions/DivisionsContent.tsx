import { Brain, Layers, AppWindow, Cpu, Code2, TrendingUp } from "lucide-react";

const DIVISIONS = [
  {
    name: "Deep Tech & AI Lab",
    description: "Applied research and frontier AI model development.",
    icon: Brain,
  },
  {
    name: "Digital Twin",
    description: "Real-time virtual replicas of physical systems.",
    icon: Layers,
  },
  {
    name: "SaaS Studio",
    description: "Enterprise-grade software products built on the AI OS.",
    icon: AppWindow,
  },
  {
    name: "AI OS",
    description: "The unified operating layer connecting every division.",
    icon: Cpu,
  },
  {
    name: "Digital Engineering",
    description: "Systems engineering for connected, automated infrastructure.",
    icon: Code2,
  },
  {
    name: "Growth Tech",
    description: "AI-driven growth, marketing, and customer intelligence.",
    icon: TrendingUp,
  },
];

export default function DivisionsContent() {
  return (
    <div className="relative z-10">
      <p
        className="text-center text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5D8FBE" }}
      >
        Our Divisions
      </p>
      <h2
        className="mt-6 text-center text-4xl font-extrabold lg:text-5xl"
        style={{ color: "#1D2E6D" }}
      >
        Six Divisions, One Intelligence
      </h2>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DIVISIONS.map((division) => (
          <div
            key={division.name}
            className="rounded-3xl border border-[#DCE6F2] p-8 shadow-card backdrop-blur-xl transition-all duration-300 hover:glow-lift"
            style={{
              background: "rgba(255,255,255,0.65)",
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
            >
              <division.icon size={22} color="white" />
            </div>
            <h3
              className="mt-6 text-lg font-bold"
              style={{ color: "#1D2E6D" }}
            >
              {division.name}
            </h3>
            <p className="mt-2 text-sm" style={{ color: "#5D8FBE" }}>
              {division.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
