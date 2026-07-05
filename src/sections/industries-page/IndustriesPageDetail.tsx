import {
  Factory,
  Sprout,
  Truck,
  HeartPulse,
  Building2,
  ShoppingBag,
  Zap,
  Eye,
  Boxes,
  Monitor,
  Bot,
  Plane,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const PRODUCT_ICONS = {
  "Vision AI": Eye,
  "Digital Twin": Boxes,
  "Command Center": Monitor,
  "AI Agents": Bot,
  "Drone AI": Plane,
  "Unified Cloud": Cloud,
  "Unified Business Cloud": Cloud,
};

const INDUSTRIES = [
  {
    number: "01",
    name: "Manufacturing Intelligence",
    tagline: "Smarter Factories. Faster Decisions.",
    icon: Factory,
    overview:
      "SVARA helps manufacturers build intelligent operations through real-time monitoring, predictive maintenance, safety analytics, and operational optimization.",
    useCases: [
      "PPE Compliance Detection",
      "Quality Inspection",
      "Defect Detection",
      "Predictive Maintenance",
      "Downtime Monitoring",
      "Process Optimization",
    ],
    products: ["Vision AI", "Digital Twin", "Command Center", "AI Agents"],
    impact: ["Reduce downtime", "Improve productivity", "Increase safety", "Lower operational loss"],
  },
  {
    number: "02",
    name: "Agriculture Intelligence",
    tagline: "Precision Farming Powered By AI",
    icon: Sprout,
    overview:
      "SVARA enables farms and agri-enterprises to optimize productivity through drone analytics, crop intelligence, irrigation monitoring, and predictive farming.",
    useCases: [
      "Crop Health Analysis",
      "Soil Monitoring",
      "Yield Forecasting",
      "Drone Surveillance",
      "Pest Detection",
      "Smart Irrigation",
    ],
    products: ["Drone AI", "Vision AI", "Digital Twin"],
    impact: ["Improve yield", "Reduce waste", "Optimize resources"],
  },
  {
    number: "03",
    name: "Logistics Intelligence",
    tagline: "Move Faster With Smarter Operations",
    icon: Truck,
    overview:
      "SVARA empowers logistics companies with fleet intelligence, route optimization, predictive delivery systems, and warehouse automation.",
    useCases: [
      "Fleet Monitoring",
      "Route Optimization",
      "Load Visibility",
      "Delivery Prediction",
      "Warehouse Analytics",
      "Driver Intelligence",
    ],
    products: ["AI Agents", "Command Center", "Vision AI", "Unified Cloud"],
    impact: ["Reduce delays", "Improve fleet efficiency", "Increase delivery reliability"],
  },
  {
    number: "04",
    name: "Healthcare Intelligence",
    tagline: "Smarter Care Through Intelligent Systems",
    icon: HeartPulse,
    overview:
      "SVARA enables healthcare institutions to improve monitoring, operations, and decision-making using intelligent automation and AI analytics.",
    useCases: [
      "Patient Monitoring",
      "Resource Optimization",
      "Workflow Automation",
      "Risk Detection",
      "Predictive Analytics",
    ],
    products: ["Vision AI", "AI Agents", "Command Center"],
    impact: ["Improve response times", "Enhance operational efficiency", "Reduce risk"],
  },
  {
    number: "05",
    name: "Smart City Intelligence",
    tagline: "Intelligence For Urban Infrastructure",
    icon: Building2,
    overview:
      "SVARA helps cities become safer, smarter, and more responsive through real-time surveillance, traffic intelligence, and urban monitoring systems.",
    useCases: ["Traffic Monitoring", "Crowd Analytics", "Public Safety", "Intrusion Detection", "Incident Response"],
    products: ["Vision AI", "Drone AI", "Command Center"],
    impact: ["Improve urban safety", "Reduce response latency", "Enable smart governance"],
  },
  {
    number: "06",
    name: "Retail Intelligence",
    tagline: "Understand Customers In Real Time",
    icon: ShoppingBag,
    overview:
      "SVARA helps retailers improve operations and customer experience through analytics, demand forecasting, and intelligent automation.",
    useCases: [
      "Footfall Analytics",
      "Demand Forecasting",
      "Customer Behavior Analysis",
      "Inventory Optimization",
      "Queue Monitoring",
    ],
    products: ["Vision AI", "AI Agents", "Unified Business Cloud"],
    impact: ["Increase sales", "Reduce stock loss", "Improve customer experience"],
  },
  {
    number: "07",
    name: "Energy Intelligence",
    tagline: "Optimize Critical Infrastructure",
    icon: Zap,
    overview:
      "SVARA enables utilities and infrastructure operators to monitor assets, predict failures, and improve operational resilience.",
    useCases: ["Asset Inspection", "Grid Monitoring", "Failure Prediction", "Thermal Analytics"],
    products: [],
    impact: [],
  },
];

export default function IndustriesPageDetail() {
  return (
    <div>
      {INDUSTRIES.map((industry, i) => (
        <Section
          key={industry.number}
          size="medium"
          style={{ background: i % 2 === 0 ? "white" : "var(--tint)" }}
        >
          <Reveal className="relative mx-auto max-w-[1400px]">
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg,#1D2E6D,#5D8FBE)" }}
              >
                <industry.icon size={22} color="white" />
              </div>
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#5D8FBE" }}
                >
                  Industry {industry.number}
                </span>
                <h2
                  className="mt-4 text-cinematic-subheading font-extrabold"
                  style={{ color: "#1D2E6D" }}
                >
                  {industry.name}
                </h2>
              </div>
            </div>
            <p
              className="mt-3 text-base font-semibold italic"
              style={{ color: "#5D8FBE" }}
            >
              {industry.tagline}
            </p>
            <p className="text-cinematic-body mt-6 max-w-2xl" style={{ color: "#5D8FBE" }}>
              {industry.overview}
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-3">
              <div>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#5D8FBE" }}
                >
                  Key Use Cases
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {industry.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="rounded-full border bg-white px-4 py-2 text-xs font-semibold"
                      style={{ borderColor: "rgba(220,230,242,0.8)", color: "#1D2E6D" }}
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              {industry.products.length > 0 && (
                <div>
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#5D8FBE" }}
                  >
                    Key Products
                  </h3>
                  <div className="mt-4 flex flex-col gap-3">
                    {industry.products.map((product) => {
                      const Icon = PRODUCT_ICONS[product as keyof typeof PRODUCT_ICONS] ?? Boxes;
                      return (
                        <div
                          key={product}
                          className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-card"
                          style={{ borderColor: "rgba(220,230,242,0.8)" }}
                        >
                          <Icon size={18} style={{ color: "#5D8FBE" }} />
                          <span className="text-sm font-semibold" style={{ color: "#1D2E6D" }}>
                            {product}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {industry.impact.length > 0 && (
                <div>
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#5D8FBE" }}
                  >
                    Business Impact
                  </h3>
                  <div className="mt-4 flex flex-col gap-3">
                    {industry.impact.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 size={16} style={{ color: "#5D8FBE" }} />
                        <span className="text-sm font-semibold" style={{ color: "#1D2E6D" }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </Section>
      ))}
    </div>
  );
}
