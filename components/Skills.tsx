"use client";

import { useState, useEffect } from "react";
import FlipCalendarCard from "./FlipCalendarCard";

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    description: "Core programming and query languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    id: "aiml",
    title: "AI/ML",
    description: "Deep learning, predictive models & agentic AI",
    skills: ["PyTorch", "XGBoost", "scikit-learn", "Pandas", "NumPy", "LangChain", "RAG"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, scalable services & payment infrastructure",
    skills: ["FastAPI", "Flask", "Express.js", "Node.js", "PostgreSQL", "Supabase", "Paystack"],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Modern component systems & reactive UI",
    skills: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "devtools",
    title: "Dev Tools",
    description: "Cloud deployment, DevOps & LLM provider APIs",
    skills: ["Docker", "Git", "VS Code API", "Vercel", "Render", "Ollama", "OpenAI API", "Claude API"],
  },
];

export default function Skills() {
  const [activeIndices, setActiveIndices] = useState<Record<string, number>>({
    languages: 0,
    aiml: 0,
    backend: 0,
    frontend: 0,
    devtools: 0,
  });

  // Master Synchronized Heartbeat Trigger for all cards
  const [syncTrigger, setSyncTrigger] = useState(0);
  const [isSectionPaused, setIsSectionPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSectionPaused) {
        setSyncTrigger((prev) => prev + 1);
      }
    }, 2400);

    return () => clearInterval(timer);
  }, [isSectionPaused]);

  const handleSkillSelect = (catId: string, idx: number) => {
    setActiveIndices((prev) => ({ ...prev, [catId]: idx }));
  };

  return (
    <section id="skills" className="py-24 sm:py-32 md:py-40 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 scroll-mt-20">
      {/* Section Header */}
      <div className="mb-16 sm:mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-foreground/50 mb-3 block">
          WORKING WITH
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Stack, tools & technologies.
        </h2>
        <p className="text-sm sm:text-base text-foreground/60 mt-3 max-w-xl">
          Synchronized flip cards cycling in unison across each core domain. Tap any card or skill tag to inspect.
        </p>
      </div>

      {/* Editorial Row List with Synchronized Flip Cards */}
      <div
        className="border-t border-foreground/10"
        onMouseEnter={() => setIsSectionPaused(true)}
        onMouseLeave={() => setIsSectionPaused(false)}
      >
        {SKILL_CATEGORIES.map((category, idx) => {
          const activeIdx = activeIndices[category.id] ?? 0;
          return (
            <div
              key={category.id}
              className="py-10 sm:py-14 border-b border-foreground/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-foreground/[0.015] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl transition-colors duration-200"
            >
              {/* Category Header Column */}
              <div className="lg:col-span-3 space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-xs font-mono text-foreground/40 shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed pl-6">
                  {category.description}
                </p>
                <div className="pl-6 pt-1">
                  <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-foreground/40">
                    {category.skills.length} technologies
                  </span>
                </div>
              </div>

              {/* Flip Card & Badges Area Column */}
              <div className="lg:col-span-9 flex flex-col md:flex-row md:items-start gap-8 lg:gap-10">
                {/* 3D Flip Calendar Card (Synchronized) */}
                <FlipCalendarCard
                  category={category.title}
                  skills={category.skills}
                  syncTrigger={syncTrigger}
                  activeSkillIndex={activeIdx}
                  onSelectSkill={(newIdx) => handleSkillSelect(category.id, newIdx)}
                />

                {/* All Skills Badges */}
                <div className="flex-1 space-y-3 pt-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-foreground/40 block">
                    All {category.title} ({category.skills.length})
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {category.skills.map((skill, sIdx) => {
                      const isActive = sIdx === activeIdx;
                      return (
                        <button
                          key={skill}
                          onClick={() => handleSkillSelect(category.id, sIdx)}
                          className={`group/badge relative px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer text-left ${
                            isActive
                              ? "border border-accent bg-accent/10 text-accent font-semibold shadow-sm"
                              : "border border-foreground/15 text-foreground/75 hover:border-foreground/40 hover:text-foreground hover:bg-foreground/[0.04]"
                          }`}
                        >
                          <span className="flex items-center">
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-1.5 animate-pulse" />
                            )}
                            {skill}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
