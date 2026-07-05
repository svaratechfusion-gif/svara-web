"use client";

import { useMemo, useState } from "react";
import { Search, Clock } from "lucide-react";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";

const FILTER_TAGS = ["AI", "Manufacturing", "Digital Twin", "Agents", "Automation"];

const ARTICLES = [
  {
    title: "Digital Twins Beyond Simulation",
    summary: "How digital twins are evolving from visual replicas into predictive intelligence systems.",
    tags: ["Digital Twin"],
  },
  {
    title: "Rise of Autonomous AI Agents",
    summary: "Why AI agents may become the next major enterprise workforce.",
    tags: ["Agents", "AI"],
  },
  {
    title: "Computer Vision in Manufacturing",
    summary: "How visual intelligence reduces downtime and improves quality.",
    tags: ["Manufacturing", "AI"],
  },
  {
    title: "Enterprise AI Adoption Challenges",
    summary: "Key obstacles enterprises face when deploying AI at scale.",
    tags: ["AI"],
  },
  {
    title: "Future of Industrial Automation",
    summary: "How automation is moving from rule-based systems to intelligent orchestration.",
    tags: ["Automation", "Manufacturing"],
  },
  {
    title: "AI OS Explained",
    summary: "Why orchestration layers are becoming essential in enterprise AI.",
    tags: ["AI", "Automation"],
  },
];

export default function InsightsArticles() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesQuery =
        query.trim() === "" ||
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase());
      const matchesTag = !activeTag || article.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <Section size="large" style={{ background: "var(--tint)" }}>
      <Reveal className="relative mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-xl">
          <div
            className="flex items-center gap-3 rounded-2xl border bg-white px-5 py-3 shadow-card"
            style={{ borderColor: "rgba(220,230,242,0.8)" }}
          >
            <Search size={18} style={{ color: "#5D8FBE" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: "#1D2E6D" }}
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className="rounded-full border px-4 py-2 text-xs font-semibold"
              style={{
                borderColor: activeTag === null ? "#1D2E6D" : "rgba(220,230,242,0.8)",
                color: activeTag === null ? "white" : "#1D2E6D",
                background: activeTag === null ? "#1D2E6D" : "white",
              }}
            >
              All
            </button>
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="rounded-full border px-4 py-2 text-xs font-semibold"
                style={{
                  borderColor: activeTag === tag ? "#1D2E6D" : "rgba(220,230,242,0.8)",
                  color: activeTag === tag ? "white" : "#1D2E6D",
                  background: activeTag === tag ? "#1D2E6D" : "white",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <div
              key={article.title}
              className="overflow-hidden rounded-2xl border border-[#DCE6F2] bg-white shadow-card transition-all duration-300 hover:glow-lift"
            >
              <div
                className="h-32"
                style={{ background: "linear-gradient(135deg,#76A8D6,#1D2E6D)" }}
              />
              <div className="p-6">
                <h3 className="text-base font-bold" style={{ color: "#1D2E6D" }}>
                  {article.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "#5D8FBE" }}>
                  {article.summary}
                </p>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center gap-2 py-12 text-center">
              <Clock size={24} style={{ color: "#5D8FBE" }} />
              <p className="text-sm font-semibold" style={{ color: "#5D8FBE" }}>
                No articles match your search.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
