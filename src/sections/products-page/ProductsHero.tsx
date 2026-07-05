import Section from "@/components/ui/section";

export default function ProductsHero() {
  return (
    <Section size="large" className="text-center">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(93,143,190,0.14) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <p
          className="text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: "#5D8FBE" }}
        >
          SVARA Products
        </p>
        <h1
          className="mt-4 text-cinematic-heading"
          style={{ color: "#1D2E6D" }}
        >
          Intelligence Products
          <br />
          Built For Scale
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-cinematic-body"
          style={{ color: "#5D8FBE" }}
        >
          SVARA&apos;s flagship AI products are engineered to help
          enterprises sense, understand, predict, automate, and optimize
          operations at scale.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            className="btn-glow-pulse rounded-2xl px-8 py-4 text-lg font-bold text-white shadow-card transition-all duration-300 hover:scale-105 hover:shadow-floating"
            style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
          >
            Explore Product Portfolio
          </button>
          <button
            className="btn-glow-pulse rounded-2xl border bg-white px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:bg-blue-50"
            style={{ borderColor: "#1D2E6D", color: "#1D2E6D" }}
          >
            Book Product Demo
          </button>
        </div>
      </div>
    </Section>
  );
}
