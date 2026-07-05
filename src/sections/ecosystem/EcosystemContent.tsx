import Image from "next/image";

export default function EcosystemContent() {
  return (
    <div className="relative z-10 text-center">
      <p
        className="text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5D8FBE" }}
      >
        The SVARA Ecosystem
      </p>

      <h2
        className="text-cinematic-heading mt-4"
        style={{ color: "#1D2E6D" }}
      >
        The Intelligence
        <br />
        Operating System
        <br />
        For Industry
      </h2>

      <p
        className="text-cinematic-body mx-auto mt-6 max-w-2xl"
        style={{ color: "#5D8FBE" }}
      >
        A modular AI ecosystem designed to sense, understand, predict, and
        orchestrate enterprise operations.
      </p>

      <div className="mt-10 flex w-full justify-center overflow-visible">
        {/* Real file is 1536x1024 (ratio 1.5) — the previous 1800x1013 (ratio
            1.777) props didn't match, and combined with max-w-7xl + the
            section's old overflow-hidden/max-w-1600px wrappers, cropped the
            rightmost part of the composition. Now full-bleed, object-contain,
            no width cap, so the whole map scales without ever being clipped. */}
        <Image
          src="/images/ecosystem/ecosystem-map.png"
          alt="SVARA Ecosystem Map"
          width={1800}
          height={1200}
          priority
          unoptimized
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="mt-10 text-center">
        <a
          href="/ecosystem"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{ background: "#1E3A8A" }}
        >
          Explore Full Ecosystem
        </a>
      </div>
    </div>
  );
}
