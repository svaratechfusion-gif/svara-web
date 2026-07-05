import { Code2, BookOpen, Plug, Package, ShieldCheck, Server, Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const CATEGORIES = [
  { name: "API Docs", icon: Code2 },
  { name: "Product Docs", icon: BookOpen },
  { name: "Integration Guides", icon: Plug },
  { name: "SDKs", icon: Package },
  { name: "Security Docs", icon: ShieldCheck },
  { name: "Deployment", icon: Server },
];

export default function DocumentationCategories() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Documentation Categories
        </h2>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
            <Clock size={12} />
            Placeholder — docs not yet published
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div
              key={category.name}
              className="rounded-3xl border border-dashed border-[#DCE6F2] p-8 shadow-card"
              style={{ background: "var(--tint)" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "rgba(93,143,190,0.15)" }}
              >
                <category.icon size={22} style={{ color: "#5D8FBE" }} />
              </div>
              <h3 className="mt-5 text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {category.name}
              </h3>
              <p className="mt-2 text-sm italic" style={{ color: "#5D8FBE" }}>
                [Content pending.]
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
