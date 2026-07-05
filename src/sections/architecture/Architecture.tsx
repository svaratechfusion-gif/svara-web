import Section from "@/components/ui/section";
import ArchitectureContent from "./ArchitectureContent";
import ArchitectureStack from "./ArchitectureStack";

export default function Architecture() {
  return (
    <Section size="large" overflow="visible">
      <div className="relative mx-auto max-w-[1400px]">
        <ArchitectureContent />
      </div>

      <div className="relative mt-4">
        <ArchitectureStack />
      </div>

      <div className="relative mx-auto mt-4 max-w-[1400px] text-center">
        <a
          href="/architecture"
          className="inline-flex items-center gap-2 text-base font-bold transition-opacity hover:opacity-70"
          style={{ color: "#1D2E6D" }}
        >
          Explore Architecture →
        </a>
      </div>
    </Section>
  );
}
