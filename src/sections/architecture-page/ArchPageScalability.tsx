import { MapPin, Zap, Radio, Video, Network } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const SUPPORTS = [
  { label: "Multi-Site Deployments", icon: MapPin },
  { label: "High Volume Event Streams", icon: Zap },
  { label: "Large Sensor Networks", icon: Radio },
  { label: "Massive Video Pipelines", icon: Video },
  { label: "Distributed AI Inference", icon: Network },
];

export default function ArchPageScalability() {
  return (
    <Section size="medium" className="text-center" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Built For Scale
        </h2>
        <p className="mt-6 text-cinematic-body" style={{ color: "#5D8FBE" }}>
          SVARA architecture is engineered to support small pilots,
          enterprise-wide deployments, and planet-scale intelligence
          systems.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SUPPORTS.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-semibold shadow-card"
              style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
            >
              <item.icon size={16} style={{ color: "#5D8FBE" }} />
              {item.label}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
