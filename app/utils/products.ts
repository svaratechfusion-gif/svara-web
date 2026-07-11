// Company Framework Level 4 — Products
// Every product traces to one capability (Observe, Understand, Predict, Coordinate, Improve).

export interface ProductInfo {
  name: string;
  copy: string;
  capability: "Observe" | "Understand" | "Predict" | "Coordinate" | "Improve";
}

export const PRODUCTS: ProductInfo[] = [
  { name: "Vision AI", copy: "Real-time visual intelligence across cameras and sensors.", capability: "Observe" },
  { name: "Drone AI", copy: "Autonomous aerial inspection and mapping.", capability: "Observe" },
  { name: "Edge AI", copy: "Inference at the source, without the round trip.", capability: "Understand" },
  { name: "AI Agents", copy: "Autonomous workflows that act, not just answer.", capability: "Understand" },
  { name: "Digital Twin", copy: "Simulate before you change it.", capability: "Predict" },
  { name: "Business Cloud", copy: "One data plane across every enterprise system.", capability: "Coordinate" },
  { name: "AI OS", copy: "The operating system for enterprise intelligence.", capability: "Coordinate" },
  { name: "Command Center", copy: "Centralized orchestration and control.", capability: "Coordinate" },
  { name: "Growth Intelligence", copy: "Continuous optimization and outcome automation.", capability: "Improve" },
];

export const PRODUCT_NAMES = PRODUCTS.map((product) => product.name);
