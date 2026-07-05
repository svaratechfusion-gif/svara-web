"use client";

import { useState } from "react";
import { Building2, Package, Code2, Briefcase, TrendingUp, Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const CATEGORIES = [
  {
    name: "Company",
    icon: Building2,
    faqs: [
      {
        question: "What is SVARA TechFusion?",
        answer:
          "SVARA TechFusion is an AI-native enterprise infrastructure company building intelligent systems for industrial transformation.",
      },
      {
        question: "Where is SVARA based?",
        answer: "SVARA TechFusion is headquartered in Hyderabad, Telangana, India.",
      },
      {
        question: "Which industries does SVARA serve?",
        answer:
          "Manufacturing, agriculture, healthcare, logistics, retail, and smart cities.",
      },
    ],
  },
  {
    name: "Products",
    icon: Package,
    faqs: [
      {
        question: "What products does SVARA offer?",
        answer:
          "SVARA offers 11 products: Vision AI, Drone AI, Edge AI, Gen AI, AI Agents, Digital Twin, AI OS, Command Center, Unified Business Cloud, Digital Engineering, and Growth Tech.",
      },
    ],
  },
  {
    name: "Technical",
    icon: Code2,
    faqs: [
      {
        question: "Does SVARA offer APIs?",
        answer: null,
      },
    ],
  },
  {
    name: "Business",
    icon: Briefcase,
    faqs: [
      {
        question: "Does SVARA build custom AI solutions?",
        answer:
          "Yes, SVARA provides custom AI infrastructure and product implementations.",
      },
    ],
  },
  {
    name: "Investors",
    icon: TrendingUp,
    faqs: [
      {
        question: "Is SVARA raising funds?",
        answer: null,
      },
    ],
  },
];

export default function FaqCategories() {
  const [active, setActive] = useState(0);
  const category = CATEGORIES[active];

  return (
    <Section size="large" className="bg-white">
      <Reveal className="relative mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                borderColor: i === active ? "#1D2E6D" : "rgba(220,230,242,0.8)",
                color: i === active ? "white" : "#1D2E6D",
                background: i === active ? "#1D2E6D" : "white",
              }}
            >
              <cat.icon size={15} />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {category.faqs.map((faq) => (
            <div
              key={faq.question}
              className={`rounded-2xl border p-6 shadow-card ${faq.answer ? "" : "border-dashed"}`}
              style={{
                borderColor: faq.answer ? "rgba(220,230,242,0.8)" : "rgba(220,230,242,0.8)",
                background: "var(--tint)",
              }}
            >
              <h3 className="text-base font-bold" style={{ color: "#1D2E6D" }}>
                {faq.question}
              </h3>
              {faq.answer ? (
                <p className="mt-2 text-sm" style={{ color: "#5D8FBE" }}>
                  {faq.answer}
                </p>
              ) : (
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
                  <Clock size={12} />
                  Placeholder — awaiting answer
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
