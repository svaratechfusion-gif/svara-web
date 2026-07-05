import Reveal from "@/components/ui/reveal";
import ProductsBackground from "./ProductsBackground";
import ProductsContent from "./ProductsContent";

export default function Products() {
  return (
    <section className="relative overflow-hidden px-8 py-24 xl:px-12">
      <ProductsBackground />
      <Reveal className="relative mx-auto max-w-[1400px]">
        <ProductsContent />
      </Reveal>
    </section>
  );
}
