import { Layers, BookOpen, Camera, FileText, Newspaper, Download } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const DOWNLOADABLES = [
  { name: "Logo Pack", icon: Layers },
  { name: "Brand Guidelines", icon: BookOpen },
  { name: "Founder Photos", icon: Camera },
  { name: "Company Deck", icon: FileText },
  { name: "Press Releases", icon: Newspaper },
  { name: "Fact Sheet", icon: Download },
];

export default function MediaKitDownloads() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Downloadables
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOWNLOADABLES.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-start gap-4 rounded-3xl border border-[#DCE6F2] p-8 shadow-card"
              style={{ background: "var(--tint)" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <item.icon size={22} color="white" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {item.name}
              </h3>
              <span
                className="flex items-center gap-2 text-sm font-semibold opacity-50"
                style={{ color: "#1D2E6D" }}
                title="Not yet available for download"
              >
                <Download size={16} />
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
