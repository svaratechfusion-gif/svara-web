import Reveal from "@/components/ui/reveal";
import BlogsBackground from "./BlogsBackground";
import BlogsContent from "./BlogsContent";

export default function Blogs() {
  return (
    <section className="relative overflow-hidden px-8 py-24 xl:px-12">
      <BlogsBackground />
      <Reveal className="relative mx-auto max-w-[1400px]">
        <BlogsContent />
      </Reveal>
    </section>
  );
}
