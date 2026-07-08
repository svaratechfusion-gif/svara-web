# Knowledge Graph

This is how AI systems understand SVARA.

SVARA is an Enterprise Intelligence company. Every page, every article, every FAQ strengthens this graph. When ChatGPT, Perplexity, Gemini, or Google AI Overviews resolve "SVARA," they resolve this graph.

---

## Root Entity

```
Enterprise Intelligence
├── AI Infrastructure
├── Computer Vision
├── Edge Computing
├── AI Agents
├── Digital Twin
├── Enterprise AI
├── Industrial Intelligence
├── Smart Cities
├── Predictive Maintenance
└── Decision Intelligence
```

---

## Entity Definitions

### Enterprise Intelligence

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` |
| **Definition** | The integrated intelligence layer that ingests disconnected operational data, transforms it into machine-readable context, and delivers actionable intelligence across the enterprise. |
| **Topical** | technology/artificial-intelligence, business/enterprise-software |
| **Keywords** | enterprise intelligence platform, operational AI, industrial AI, enterprise intelligence infrastructure |
| **Related** | AI Infrastructure, Enterprise AI, Decision Intelligence |
| **Page** | Homepage, /platform |
| **Products** | All |
| **Glossary** | /knowledge/glossary#enterprise-intelligence |

---

### AI Infrastructure

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` |
| **Definition** | The foundational layer of hardware, software, and networking resources purpose-built to support enterprise-grade AI workloads. |
| **Supports** | All SVARA products |
| **Related** | Edge Computing, Enterprise AI |
| **Page** | /platform, /technology |
| **Products** | Sense AI, Think Engine, Simulate Lab |
| **Glossary** | /knowledge/glossary#ai-infrastructure |

---

### Computer Vision

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` (sub-type: ComputerVision) |
| **Definition** | AI-powered visual analysis that processes real-time and historical video/imagery from drones, cameras, satellites, and IoT sensors to detect, classify, and track objects across industrial environments. |
| **Related** | AI Infrastructure, Edge Computing, Predictive Maintenance, Industrial Intelligence |
| **Page** | /products/sense-ai, /industries |
| **Products** | Sense AI |
| **Glossary** | /knowledge/glossary#computer-vision |

---

### Edge Computing

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` (sub-type: EdgeComputing) |
| **Definition** | Distributed computing paradigm that processes data at or near the source of generation rather than relying on centralized cloud infrastructure. |
| **Related** | AI Infrastructure, Computer Vision, Digital Twin, Predictive Maintenance |
| **Page** | /technology, /industries |
| **Products** | Sense AI |
| **Glossary** | /knowledge/glossary#edge-computing |

---

### AI Agents

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` (sub-type: AIAgent) |
| **Definition** | Autonomous software entities that perceive their environment, reason about goals, and execute multi-step actions within enterprise systems. |
| **Related** | Enterprise AI, Decision Intelligence |
| **Page** | /platform, /products/think-engine |
| **Products** | Think Engine, Operate AI |
| **Glossary** | /knowledge/glossary#ai-agents |

---

### Digital Twin

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` (sub-type: DigitalTwin) |
| **Definition** | A virtual replica of a physical system, process, or environment that is continuously synchronized with real-world data for simulation, monitoring, and optimization. |
| **Related** | Computer Vision, Predictive Maintenance, Industrial Intelligence |
| **Page** | /products/simulate-lab, /industries |
| **Products** | Simulate Lab |
| **Glossary** | /knowledge/glossary#digital-twin |

---

### Enterprise AI

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` |
| **Definition** | AI systems designed, deployed, and governed specifically for enterprise-scale operations, compliance, and decision-making. |
| **Related** | AI Infrastructure, Decision Intelligence, AI Agents |
| **Page** | /platform, /technology |
| **Products** | All |
| **Glossary** | /knowledge/glossary#enterprise-ai |

---

### Industrial Intelligence

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` |
| **Definition** | The application of AI and data analytics to industrial operations — manufacturing, logistics, energy, utilities, construction — to optimize processes, reduce downtime, and increase safety. |
| **Related** | Computer Vision, Predictive Maintenance, Digital Twin, Edge Computing |
| **Page** | /industries |
| **Products** | All |
| **Glossary** | /knowledge/glossary#industrial-intelligence |

---

### Smart Cities

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` |
| **Definition** | Urban environments where AI infrastructure, computer vision, and IoT converge to manage traffic, public safety, utilities, waste, and environmental monitoring at city scale. |
| **Related** | Computer Vision, Edge Computing, Industrial Intelligence |
| **Page** | /industries/smart-cities |
| **Products** | Sense AI, Think Engine |
| **Glossary** | /knowledge/glossary#smart-cities |

---

### Predictive Maintenance

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` |
| **Definition** | AI-driven approach that uses sensor data, computer vision, and historical patterns to predict equipment failure before it occurs. |
| **Related** | Computer Vision, Digital Twin, Edge Computing, Industrial Intelligence |
| **Page** | /industries |
| **Products** | Sense AI, Simulate Lab |
| **Glossary** | /knowledge/glossary#predictive-maintenance |

---

### Decision Intelligence

| Property | Value |
|----------|-------|
| **Type** | `schema:Thing` → `schema:SoftwareApplication` |
| **Definition** | The discipline of transforming AI-generated insights into executable business decisions through explainable recommendations, simulation outcomes, and automated workflows. |
| **Related** | Enterprise AI, AI Agents |
| **Page** | /platform, /products/operate-ai |
| **Products** | Operate AI, Think Engine |
| **Glossary** | /knowledge/glossary#decision-intelligence |

---

## Entity Relationships

```
Enterprise Intelligence
│
├── is_powered_by → AI Infrastructure
│   ├── enables → Computer Vision
│   ├── enables → Edge Computing
│   └── enables → Digital Twin
│
├── is_composed_of → AI Agents
│   └── enables → Decision Intelligence
│
├── is_applied_to → Enterprise AI
│   ├── is_applied_to → Industrial Intelligence
│   │   ├── includes → Smart Cities
│   │   ├── enables → Predictive Maintenance
│   │   └── powered_by → Computer Vision
│   │   └── powered_by → Edge Computing
│   └── enables → Decision Intelligence
│
└── is_represented_as → Digital Twin
    ├── powered_by → Computer Vision
    └── enables → Predictive Maintenance
```

---

## Page → Entity Mapping

Every page on SVARA maps to at least one entity. Every entity maps to at least one page.

| Page | Primary Entity | Secondary Entities |
|------|---------------|-------------------|
| `/` | Enterprise Intelligence | All |
| `/platform` | Enterprise Intelligence | AI Infrastructure, Enterprise AI, Decision Intelligence |
| `/products/sense-ai` | Computer Vision | Edge Computing, Predictive Maintenance |
| `/products/think-engine` | AI Agents | Enterprise AI, Decision Intelligence |
| `/products/simulate-lab` | Digital Twin | Predictive Maintenance, Computer Vision |
| `/products/operate-ai` | Decision Intelligence | AI Agents |
| `/industries` | Industrial Intelligence | All |
| `/industries/smart-cities` | Smart Cities | Computer Vision, Edge Computing |
| `/technology` | AI Infrastructure | Edge Computing, Enterprise AI |
| `/knowledge/glossary` | Enterprise Intelligence | All (definitions) |
| `/knowledge/faq` | Enterprise Intelligence | All (answers) |

---

## Content → Graph Strength

### Articles
Each article targets exactly one primary entity and one secondary entity. Every article links to the glossary definition of its primary entity. Every article links to the related product page.

### FAQ
Each FAQ answer links to its canonical glossary definition. FAQ answers cross-reference related terms. FAQPage structured data includes `about` pointing to the primary entity.

### Glossary
Single source of truth. Every term has exactly one definition. Every definition includes `mentions` relationships. Every definition links to related terms.

---

## Implementation

### JSON-LD Graph (homepage)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://svaratechfusion.com/#org",
      "name": "SVARA TechFusion",
      "url": "https://svaratechfusion.com",
      "knowsAbout": [
        "Enterprise Intelligence",
        "AI Infrastructure",
        "Computer Vision",
        "Edge Computing",
        "AI Agents",
        "Digital Twin",
        "Enterprise AI",
        "Industrial Intelligence",
        "Smart Cities",
        "Predictive Maintenance",
        "Decision Intelligence"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://svaratechfusion.com/#webpage",
      "about": { "@id": "https://svaratechfusion.com/#enterprise-intelligence" },
      "mainEntity": { "@id": "https://svaratechfusion.com/#enterprise-intelligence" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://svaratechfusion.com/#enterprise-intelligence",
      "name": "Enterprise Intelligence",
      "applicationCategory": "Enterprise AI Platform",
      "offers": {
        "@type": "AggregateOffer",
        "itemOffered": [
          { "@type": "SoftwareApplication", "name": "Sense AI" },
          { "@type": "SoftwareApplication", "name": "Think Engine" },
          { "@type": "SoftwareApplication", "name": "Simulate Lab" },
          { "@type": "SoftwareApplication", "name": "Operate AI" },
          { "@type": "SoftwareApplication", "name": "Grow AI" }
        ]
      }
    }
  ]
}
```

### Per-Product Structured Data (product pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sense AI",
  "applicationCategory": "Computer Vision",
  "audience": "Enterprise",
  "about": { "@id": "https://svaratechfusion.com/#computer-vision" },
  "manufacturer": { "@id": "https://svaratechfusion.com/#org" }
}
```

---

## Graph Health Rules

| Rule | Enforcement |
|------|-------------|
| Every entity has ≥1 page | Site map audit |
| Every page maps to ≥1 entity | Content inventory |
| Every entity has a glossary definition | Glossary is complete |
| Every article links to its primary entity glossary term | Editorial review |
| Every FAQ answer links to ≥1 glossary term | Editorial review |
| No entity has >100 words of definition | Concision |
| Every entity defines its relationship to ≥2 other entities | Graph integrity |
| JSON-LD validates on every page | CI check |

---

**End of Knowledge Graph. Every page strengthens it. Every article strengthens it. Every FAQ strengthens it. This is how AI systems understand SVARA.**
