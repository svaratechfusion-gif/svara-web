import { Lock, UserCog, ShieldCheck, FileText, Scale, ClipboardCheck } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const FEATURES = [
  { label: "End-to-End Encryption", icon: Lock },
  { label: "Role-Based Access Control", icon: UserCog },
  { label: "Zero Trust Security", icon: ShieldCheck },
  { label: "Audit Logging", icon: FileText },
  { label: "Governance Policies", icon: Scale },
  { label: "Compliance Controls", icon: ClipboardCheck },
];

export default function ArchPageSecurity() {
  return (
    <Section size="medium" className="text-center" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Security By Architecture
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          Security and governance are embedded across every layer of the
          SVARA stack.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-4 shadow-card"
              style={{ borderColor: "rgba(220,230,242,0.8)" }}
            >
              <feature.icon size={18} style={{ color: "#5D8FBE" }} />
              <span className="text-left text-sm font-semibold" style={{ color: "#1D2E6D" }}>
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
