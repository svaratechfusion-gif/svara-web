import { Brain, Cpu, Code2, Layers, TrendingUp } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const ROLES = [
  { title: "AI Engineer", icon: Brain },
  { title: "ML Engineer", icon: Cpu },
  { title: "Full Stack Engineer", icon: Code2 },
  { title: "Product Designer", icon: Layers },
  { title: "Growth Strategist", icon: TrendingUp },
];

export default function CareersOpenRoles() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <h2
          className="text-center text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Open Roles
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role) => (
            <div
              key={role.title}
              className="rounded-3xl border border-[#DCE6F2] p-8 shadow-card transition-all duration-300 hover:glow-lift"
              style={{ background: "var(--tint)" }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <role.icon size={22} color="white" />
              </div>
              <h3 className="mt-5 text-lg font-bold" style={{ color: "#1D2E6D" }}>
                {role.title}
              </h3>
              <p className="mt-2 text-xs italic" style={{ color: "#5D8FBE" }}>
                [Location / employment type pending]
              </p>
              <span
                className="mt-6 inline-flex items-center rounded-full px-4 py-2 text-xs font-bold opacity-50"
                style={{ background: "rgba(93,143,190,0.15)", color: "#1D2E6D" }}
                title="Applications not yet open"
              >
                Applications Coming Soon
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
