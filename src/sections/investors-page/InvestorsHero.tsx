import Section from "@/components/ui/section";

export default function InvestorsHero() {
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
          Investor Relations
        </p>
        <h1
          className="mt-4 text-cinematic-heading"
          style={{ color: "#1D2E6D" }}
        >
          Investing In
          <br />
          The Future Of
          <br />
          Enterprise Intelligence
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-cinematic-body"
          style={{ color: "#5D8FBE" }}
        >
          SVARA welcomes strategic investors, advisors, and ecosystem
          partners building the future of AI-native enterprise
          infrastructure.
        </p>
      </div>
    </Section>
  );
}
