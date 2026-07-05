import { Activity, Zap, MapPin, Radio, Cpu } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const CAPACITY = [
  { label: "Real-Time Streams", icon: Activity },
  { label: "High-Volume Events", icon: Zap },
  { label: "Multi-Site Deployments", icon: MapPin },
  { label: "Large Sensor Networks", icon: Radio },
  { label: "Massive AI Inference Workloads", icon: Cpu },
];

export default function TechnologyPerformance() {
  return (
    <Section size="medium" className="text-center" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Built For Performance
        </h2>
        <p
          className="mt-6 text-sm font-bold uppercase tracking-[0.2em]"
          style={{ color: "#5D8FBE" }}
        >
          Supports
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CAPACITY.map((item) => (
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
