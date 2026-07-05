import type { CSSProperties, ReactNode } from "react";

type SectionSize = "large" | "medium" | "small";

// The one place section-level vertical padding is defined — every section
// (except Hero, which is the sole full-viewport exception) picks one of
// these three tiers instead of an ad-hoc py-* value, so rhythm stays
// consistent across the whole site rather than drifting section to section.
const PADDING: Record<SectionSize, string> = {
  large: "py-24",
  medium: "py-16",
  small: "py-10",
};

// Explicit lookup, not a `overflow-${overflow}` template string — Tailwind's
// build-time scanner needs each class as a complete literal somewhere in the
// source to generate its CSS, and won't reliably resolve an interpolated one.
const OVERFLOW: Record<"hidden" | "visible", string> = {
  hidden: "overflow-hidden",
  visible: "overflow-visible",
};

export default function Section({
  size = "large",
  overflow = "hidden",
  className = "",
  style,
  children,
}: {
  size?: SectionSize;
  /** Some sections (e.g. Ecosystem's full-bleed map) need visible overflow
   * to avoid clipping their own content — an explicit prop instead of
   * relying on className string order to win the cascade. */
  overflow?: "hidden" | "visible";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      className={`relative ${OVERFLOW[overflow]} px-6 xl:px-12 ${PADDING[size]} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
