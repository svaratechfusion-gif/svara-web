import { FileText, Download } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

// TODO: link real PDF files once produced — buttons are non-functional placeholders for now.
const PAPERS = [
  "The Enterprise Intelligence Framework 2026",
  "AI Infrastructure Readiness Index",
  "Industrial AI Transformation Blueprint",
];

export default function InsightsResearch() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Research & Whitepapers
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PAPERS.map((title) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-3xl border p-8 shadow-card"
              style={{ borderColor: "rgba(220,230,242,0.8)", background: "var(--tint)" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <FileText size={22} color="white" />
              </div>
              <h3 className="text-base font-bold" style={{ color: "#1D2E6D" }}>
                {title}
              </h3>
              <span
                className="flex items-center gap-2 text-sm font-semibold opacity-50"
                style={{ color: "#1D2E6D" }}
                title="Coming soon"
              >
                <Download size={16} />
                Download PDF
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
