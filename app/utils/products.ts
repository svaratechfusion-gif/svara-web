// Company Framework Level 4 — Products
// Every product traces to one capability (Sense, Think, Predict, Act, Learn).

export interface ProductInfo {
  name: string;
  copy: string;
  capability: "Sense" | "Think" | "Predict" | "Act" | "Learn";
}

export const PRODUCTS: ProductInfo[] = [
  { name: "Vision AI", copy: "Real-time visual intelligence across cameras and sensors.", capability: "Sense" },
  { name: "Drone AI", copy: "Autonomous aerial inspection and mapping.", capability: "Sense" },
  { name: "Edge AI", copy: "Inference at the source, without the round trip.", capability: "Think" },
  { name: "AI Agents", copy: "Autonomous workflows that act, not just answer.", capability: "Think" },
  { name: "Digital Twin", copy: "Simulate before you change it.", capability: "Predict" },
  { name: "Business Cloud", copy: "One data plane across every enterprise system.", capability: "Act" },
  { name: "AI OS", copy: "The operating system for enterprise intelligence.", capability: "Act" },
  { name: "Command Center", copy: "Centralized orchestration and control.", capability: "Act" },
  { name: "Growth Intelligence", copy: "Continuous optimization and outcome automation.", capability: "Learn" },
];

export const PRODUCT_NAMES = PRODUCTS.map((product) => product.name);
