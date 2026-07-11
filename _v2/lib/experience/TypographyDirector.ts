// Typography never "appears" — it emerges (Design Commandment territory).
// This director owns every DOM-text entrance in the experience, built on the
// premium text plugins (SplitText, ScrambleText). The particle-formed
// headline (Scene 03) stays in the WebGL world; this handles the real-DOM
// captions/wordmarks layered above it.
import { gsap, SplitText, EASES } from "~~/lib/gsap";

export class TypographyDirector {
  private splits = new Set<SplitText>();

  /**
   * Chars assemble into place — the DOM sibling of the particle glyph
   * language (rise + settle, no plain fade). Returns the tween; call the
   * returned SplitText-cleanup via dispose() or individually.
   */
  emerge(target: gsap.DOMTarget, vars: gsap.TweenVars = {}) {
    const split = new SplitText(target, { type: "words,chars" });
    this.splits.add(split);
    return gsap.from(split.chars, {
      yPercent: 60,
      autoAlpha: 0,
      stagger: 0.02,
      duration: 0.7,
      ease: EASES.assemble,
      ...vars,
    });
  }

  /** Decrypt-style resolve for data/telemetry captions. */
  scramble(target: gsap.DOMTarget, text: string, vars: gsap.TweenVars = {}) {
    return gsap.to(target, {
      scrambleText: { text, chars: "01▮▯·", speed: 0.6 },
      duration: 1.1,
      ease: "none",
      ...vars,
    });
  }

  /** Whole-line reveal for quiet beats (the ending) — one soft settle. */
  settle(target: gsap.DOMTarget, vars: gsap.TweenVars = {}) {
    return gsap.from(target, { y: 24, autoAlpha: 0, duration: 1.1, ease: EASES.cinematic, ...vars });
  }

  /** Reverts all SplitText DOM surgery — required before unmount. */
  dispose() {
    for (const split of this.splits) split.revert();
    this.splits.clear();
  }
}
