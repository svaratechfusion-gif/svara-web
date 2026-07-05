"use client";

import { useEffect, useState } from "react";

// Each entry is one reveal "frame" — frames 3 and 4 are multi-word lines
// that arrive together as a single unit, not word-by-word within the line.
const HEADLINE_FRAMES = ["Engineering", "Intelligence", "For The Future", "Of Industry"];
const FRAME_STAGGER = 0.22;

// Plain CSS animation, not Framer Motion — a JS/RAF-driven mount animation
// can end up permanently stuck at its initial (invisible) state in some
// embedding/preview contexts, since it depends on the animation frame loop
// actually running. CSS @keyframes are *also* throttled the same way on a
// page where document.visibilityState is "hidden" (confirmed: animation
// reports playState "running" but the computed value never advances) —
// which happens not just in backgrounded tabs but in some embedded preview
// panels (editor "simple browser" views, some iframes) that don't correctly
// report visible. useSkipHiddenAnimation detects that case and renders the
// final state immediately instead of leaving content stuck invisible.
function useSkipHiddenAnimation() {
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    // Deferred into a callback (not called synchronously in the effect
    // body) per react-hooks/set-state-in-effect.
    const id = setTimeout(() => {
      if (document.visibilityState === "hidden") setSkip(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);
  return skip;
}

export default function HeroTypography() {
  const skipAnimation = useSkipHiddenAnimation();

  return (
    // TEMPORARY diagnostic sizing (smaller text, shifted up, narrower max
    // width) to expose more of the background video for visibility testing
    // — not the intended final hero layout. Revert to text-cinematic-hero
    // (no size/position overrides) once the video check is done.
    <div className="absolute left-0 top-0 z-20 flex h-full w-full max-w-[1200px] -translate-y-[7vh] flex-col justify-center px-[3vw]">
      <p
        className={skipAnimation ? "mb-6" : "fade-up-in mb-6"}
        style={{ color: "#1D2E6D", letterSpacing: "0.25em", fontSize: 14, fontWeight: 600, textTransform: "uppercase", opacity: skipAnimation ? 0.6 : undefined }}
      >
        Enterprise AI Operating System
      </p>

      <h1
        className="text-[6.2rem] 2xl:text-[8rem] leading-[0.82] font-black"
        style={{ color: "#132257" }}
      >
        {HEADLINE_FRAMES.map((frame, i) => (
          <span key={frame} className="block overflow-hidden">
            <span
              className={skipAnimation ? "inline-block" : "word-reveal inline-block"}
              style={skipAnimation ? undefined : { animationDelay: `${0.2 + i * FRAME_STAGGER}s` }}
            >
              {frame}
            </span>
          </span>
        ))}
      </h1>
    </div>
  );
}
