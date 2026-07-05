export default function CtaContent() {
  return (
    <div className="relative z-10 text-center">
      <h2 className="text-cinematic-heading text-white">
        Ready To Build
        <br />
        Intelligence At Scale?
      </h2>
      <p className="text-cinematic-body mx-auto mt-6 max-w-2xl" style={{ color: "#A9C1E0" }}>
        Whether you are building intelligent operations, exploring AI
        transformation, or investing in the future of enterprise
        intelligence—SVARA is ready to collaborate.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          className="btn-glow-pulse rounded-2xl bg-white px-8 py-4 text-lg font-bold shadow-card transition-all duration-300 hover:scale-105 hover:shadow-floating"
          style={{ color: "#1D2E6D" }}
        >
          Book Demo
        </button>
        <button
          className="btn-glow-pulse rounded-2xl border border-white/40 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
        >
          Talk to Experts
        </button>
      </div>
    </div>
  );
}
