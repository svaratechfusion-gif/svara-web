import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

export default function ContactMap() {
  return (
    <Section size="medium" className="bg-white">
      <Reveal className="relative mx-auto max-w-[1400px]">
        <div
          className="overflow-hidden rounded-3xl border shadow-card"
          style={{ borderColor: "rgba(220,230,242,0.8)" }}
        >
          <iframe
            title="SVARA TechFusion location — Hyderabad, Telangana, India"
            src="https://www.google.com/maps?q=Hyderabad,+Telangana,+India&output=embed"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </Section>
  );
}
