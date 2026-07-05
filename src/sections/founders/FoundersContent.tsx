const FOUNDERS = [
  {
    name: "Sindhu Varikuppala",
    title: "Founder & CEO",
    highlights: ["Strategic Vision", "AI Innovation", "Business Leadership"],
    initials: "SV",
  },
  {
    name: "Prabhath Sandesh",
    title: "Co-Founder & COO",
    highlights: ["Operations", "GTM Strategy", "Business Expansion"],
    initials: "PS",
  },
];

export default function FoundersContent() {
  return (
    <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
      <div className="flex flex-col gap-6">
        {FOUNDERS.map((founder) => (
          <div
            key={founder.name}
            className="flex items-center gap-6 rounded-3xl border border-[#DCE6F2] p-8 shadow-card transition-all duration-300 hover:glow-lift"
            style={{
              background: "rgba(255,255,255,0.85)",
            }}
          >
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)",
                boxShadow: "0 0 0 4px rgba(118,168,214,0.25)",
              }}
            >
              {founder.initials}
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {founder.name}
              </h3>
              <p className="text-sm font-semibold" style={{ color: "#5D8FBE" }}>
                {founder.title}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {founder.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border px-3 py-1 text-xs font-medium"
                    style={{
                      borderColor: "rgba(220,230,242,0.8)",
                      color: "#1D2E6D",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p
          className="text-2xl font-semibold leading-relaxed lg:text-3xl"
          style={{ color: "#1D2E6D" }}
        >
          &ldquo;We believe intelligence should not live inside isolated
          systems. It should flow across operations, decisions, and
          industries—empowering businesses to sense, predict, and act in real
          time.&rdquo;
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#5D8FBE" }}
            >
              Mission
            </h4>
            <p className="mt-2 text-sm" style={{ color: "#1D2E6D" }}>
              To build the intelligence infrastructure powering the future of
              industry.
            </p>
          </div>
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#5D8FBE" }}
            >
              Vision
            </h4>
            <p className="mt-2 text-sm" style={{ color: "#1D2E6D" }}>
              To become the world&apos;s most trusted AI-native enterprise
              ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
