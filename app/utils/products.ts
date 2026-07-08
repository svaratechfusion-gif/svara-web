// Shared between IntelligenceWorld.vue (Scene 06's particle behaviors) and
// SceneProducts.vue (the real-DOM captions) — same order both places matters,
// since IntelligenceWorld writes activeProduct by name and SceneProducts
// looks the matching description up by that same name.
export interface ProductInfo {
  name: string;
  copy: string;
}

export const PRODUCTS: ProductInfo[] = [
  { name: "Vision AI", copy: "Real-time visual intelligence across cameras and sensors." },
  { name: "Drone AI", copy: "Autonomous aerial inspection and mapping." },
  { name: "Digital Twin", copy: "Simulate the plant floor before you change it." },
  { name: "AI Agents", copy: "Autonomous workflows that act, not just answer." },
  { name: "Edge AI", copy: "Inference at the source, without the round trip." },
  { name: "Generative AI", copy: "Enterprise-grade content and reasoning models." },
  { name: "Business Cloud", copy: "ERP, CRM, HR — one data plane across every system you run." },
];

export const PRODUCT_NAMES = PRODUCTS.map((product) => product.name);
