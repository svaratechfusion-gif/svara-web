import {
  Eye,
  Plane,
  Cpu,
  Wand2,
  Bot,
  Boxes,
  Route,
  Monitor,
  Cloud,
  Code2,
  TrendingUp,
} from "lucide-react";
import ProductsConstellation from "./ProductsConstellation";

const PRODUCTS = [
  { name: "Vision AI", icon: Eye },
  { name: "Drone AI", icon: Plane },
  { name: "Edge AI", icon: Cpu },
  { name: "Gen AI", icon: Wand2 },
  { name: "AI Agents", icon: Bot },
  { name: "Digital Twin", icon: Boxes },
  { name: "AI OS", icon: Route },
  { name: "Command Center", icon: Monitor },
  { name: "Unified Business Cloud", icon: Cloud },
  { name: "Digital Engineering", icon: Code2 },
  { name: "Growth Tech", icon: TrendingUp },
];

export default function ProductsContent() {
  return (
    <div className="relative z-10">
      <p
        className="text-center text-xs font-bold uppercase tracking-[0.25em]"
        style={{ color: "#5D8FBE" }}
      >
        Our Products
      </p>
      <h2
        className="mt-6 text-center text-4xl font-extrabold lg:text-5xl"
        style={{ color: "#1D2E6D" }}
      >
        11 Products, One Platform
      </h2>

      <ProductsConstellation />

      {/* Mobile fallback — the absolute-positioned constellation only renders lg+ */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:hidden">
        {PRODUCTS.map((product) => (
          <div
            key={product.name}
            className="flex items-center gap-3 rounded-2xl border border-[#DCE6F2] px-4 py-3 shadow-card"
            style={{ background: "rgba(255,255,255,0.7)" }}
          >
            <product.icon size={16} style={{ color: "#5D8FBE" }} />
            <span className="text-sm font-semibold" style={{ color: "#1D2E6D" }}>
              {product.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
