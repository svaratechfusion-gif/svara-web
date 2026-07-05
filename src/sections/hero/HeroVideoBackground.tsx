const HERO_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4";

// object-contain (not object-cover) — the video must show its full original
// composition, letterboxed if its aspect ratio doesn't match the viewport,
// rather than being scaled up and cropped to fill the frame. No scale
// transform, no animation, no zoom, no object-position offset: object-center
// is the identity/default position, kept explicit only so it's obvious
// nothing is nudging the frame off-center.
// No overlay div, no backdrop-blur, no CSS filter either (still the raw
// diagnostic state from the previous request).
// `src` stays direct on <video> (not a <source> child) — that part isn't a
// visual/crop issue, it's what makes the video actually load in this React
// tree at all; see prior notes on <video><source> not auto-loading when
// built via createElement/appendChild instead of parsed from static HTML.
export default function HeroVideoBackground() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-contain object-center"
      src={HERO_VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
