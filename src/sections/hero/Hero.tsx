import HeroVideoBackground from "./HeroVideoBackground";
// import HeroTypography from "./HeroTypography";

export default function Hero() {
  return (
    // overflow-hidden here is inert with the video's current object-contain
    // sizing — the video's own box already matches the section exactly
    // (absolute inset-0, h-full w-full), and object-contain guarantees the
    // video's rendered content never exceeds that box, so nothing is being
    // clipped by this. Left in place since it's harmless and protects
    // against any future element that does need it.
    <section className="relative h-[100svh] w-screen overflow-hidden" style={{ minHeight: 900 }}>
      <HeroVideoBackground />
      {/* TEMPORARY diagnostic — HeroTypography unmounted entirely so nothing
          but the raw video renders. Uncomment the import above and this
          line to restore once the video-clarity check is done. */}
      {/* <HeroTypography /> */}
    </section>
  );
}
