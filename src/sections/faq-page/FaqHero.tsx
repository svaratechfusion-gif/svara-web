import Section from "@/components/ui/section";

export default function FaqHero() {
  return (
    <Section size="large" className="text-center">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(93,143,190,0.14) 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <p
          className="text-xs font-bold uppercase tracking-[0.25em]"
          style={{ color: "#5D8FBE" }}
        >
          Frequently Asked Questions
        </p>
        <h1
          className="mt-4 text-cinematic-heading"
          style={{ color: "#1D2E6D" }}
        >
          Everything You Need
          <br />
          To Know About SVARA
        </h1>
      </div>
    </Section>
  );
}
