import { MapPin, Mail, Globe, Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ContactInfo() {
  return (
    <Section size="medium" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <h2
          className="text-cinematic-subheading font-extrabold"
          style={{ color: "#1D2E6D" }}
        >
          Reach Us Directly
        </h2>

        <div
          className="mt-10 rounded-3xl border bg-white p-10 shadow-card"
          style={{ borderColor: "rgba(220,230,242,0.8)" }}
        >
          <h3 className="text-lg font-bold" style={{ color: "#1D2E6D" }}>
            SVARA TechFusion Private Limited
          </h3>

          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#5D8FBE" }}>
              <MapPin size={16} />
              Hyderabad, Telangana, India
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#5D8FBE" }}>
              <Mail size={16} />
              contact@svaratechfusion.com
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#5D8FBE" }}>
              <Globe size={16} />
              SVARA TechFusion
            </span>
          </div>

          <div
            className="mt-8 flex items-center justify-center gap-2 border-t pt-6 text-sm font-semibold"
            style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
          >
            <Clock size={16} style={{ color: "#5D8FBE" }} />
            Monday – Saturday · 10:00 AM – 7:00 PM IST
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
