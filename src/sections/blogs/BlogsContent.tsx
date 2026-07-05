import { ArrowRight } from "lucide-react";

const FEATURED = {
  title: "Why AI Infrastructure Will Define The Next Industrial Revolution",
  meta: "8 min read · AI Research · June 2026",
  excerpt:
    "The next generation of industry will not be driven by isolated AI tools, but by intelligent infrastructure capable of perception, reasoning, and orchestration.",
};

const SECONDARY = [
  { title: "Digital Twins Beyond Simulation", meta: "AI Research" },
  { title: "Rise of Autonomous AI Agents", meta: "Industry Insights" },
  { title: "Computer Vision in Manufacturing", meta: "Case Studies" },
];

export default function BlogsContent() {
  return (
    <div className="relative z-10">
      <p
        className="text-center text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5D8FBE" }}
      >
        SVARA Insights
      </p>
      <h2
        className="mt-6 text-center text-4xl font-extrabold lg:text-5xl"
        style={{ color: "#1D2E6D" }}
      >
        Ideas Shaping
        <br />
        The Future Of Intelligence
      </h2>
      <p
        className="mx-auto mt-6 max-w-2xl text-center text-lg"
        style={{ color: "#5D8FBE" }}
      >
        Research, insights, and perspectives on AI, automation, digital
        twins, and enterprise transformation.
      </p>

      <div
        className="mt-16 grid gap-0 overflow-hidden rounded-3xl border shadow-card lg:grid-cols-2"
        style={{
          background: "rgba(255,255,255,0.8)",
          borderColor: "rgba(220,230,242,0.8)",
        }}
      >
        <div
          className="h-64 lg:h-auto"
          style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
        />
        <div className="flex flex-col justify-center p-10">
          <span className="text-xs font-semibold" style={{ color: "#5D8FBE" }}>
            {FEATURED.meta}
          </span>
          <h3
            className="mt-3 text-2xl font-bold"
            style={{ color: "#1D2E6D" }}
          >
            {FEATURED.title}
          </h3>
          <p className="mt-4 text-sm" style={{ color: "#5D8FBE" }}>
            {FEATURED.excerpt}
          </p>
          <span
            className="mt-6 flex items-center gap-2 text-sm font-bold"
            style={{ color: "#1D2E6D" }}
          >
            Read Article <ArrowRight size={16} />
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {SECONDARY.map((post) => (
          <div
            key={post.title}
            className="overflow-hidden rounded-2xl border border-[#DCE6F2] shadow-card transition-all duration-300 hover:glow-lift"
            style={{
              background: "rgba(255,255,255,0.8)",
            }}
          >
            <div
              className="h-32"
              style={{
                background: "linear-gradient(135deg,#76A8D6,#1D2E6D)",
              }}
            />
            <div className="p-6">
              <span className="text-xs font-semibold" style={{ color: "#5D8FBE" }}>
                {post.meta}
              </span>
              <h3
                className="mt-2 text-base font-bold"
                style={{ color: "#1D2E6D" }}
              >
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
