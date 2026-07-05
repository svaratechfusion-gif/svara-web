export default function CtaBackground() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{ background: "linear-gradient(135deg,#0F1B4D,#1D2E6D)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(118,168,214,0.25) 0%, transparent 60%)",
        }}
      />

      {/* Soften the hard light→dark seam against the previous (white) section */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
        }}
      />

      {/* Soften the hard dark→light seam against the next (tint) section */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(245,250,255,0.4), transparent)",
        }}
      />
    </div>
  );
}
