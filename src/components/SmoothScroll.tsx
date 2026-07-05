"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
    });

    // Without this, GSAP ScrollTrigger's cached scroll-position tracking
    // desyncs from Lenis's virtualized scroll — continuous scrub tweens
    // still look roughly right (GSAP polls window.scrollY independently
    // and just lags), but one-time onEnter/onLeave threshold crossings can
    // be missed outright, since ScrollTrigger never gets told a scroll
    // happened at the moment Lenis actually moved the page.
    lenis.on("scroll", ScrollTrigger.update);

    // Driving Lenis from GSAP's own ticker (instead of a separate raw rAF
    // loop) keeps both on the same frame clock; disabling GSAP's lag
    // smoothing avoids it silently skipping ticks to "catch up," which
    // would otherwise reintroduce the same desync this is fixing.
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return null;
}
