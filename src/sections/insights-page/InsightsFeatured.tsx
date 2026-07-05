import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function InsightsFeatured() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <p
          className="text-center text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: "#5D8FBE" }}
        >
          Featured Insight
        </p>

        <div
          className="mt-10 grid gap-0 overflow-hidden rounded-3xl border shadow-card lg:grid-cols-2"
          style={{ borderColor: "rgba(220,230,242,0.8)" }}
        >
          <div
            className="h-64 lg:h-auto"
            style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
          />
          <div className="flex flex-col justify-center p-10">
            <span className="text-xs font-semibold" style={{ color: "#5D8FBE" }}>
              Vision Paper · 8 min read
            </span>
            <h2
              className="mt-3 text-cinematic-subheading font-bold"
              style={{ color: "#1D2E6D" }}
            >
              Why AI Infrastructure Will Define The Next Industrial
              Revolution
            </h2>
            <p className="mt-4 text-sm" style={{ color: "#5D8FBE" }}>
              The next wave of enterprise transformation will not be driven
              by isolated AI tools, but by intelligence infrastructure
              capable of sensing, reasoning, predicting, and orchestrating
              decisions at scale.
            </p>
            <span
              className="mt-6 flex items-center gap-2 text-sm font-bold"
              style={{ color: "#1D2E6D" }}
            >
              Read Article <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
