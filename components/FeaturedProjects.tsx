"use client";

import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    number: "01",
    title: "IncPay",
    description:
      "A payment-bridge platform with escrow-backed transactions, flexible settlements, and multi-channel payments.",
    tech: ["FastAPI", "Python", "React", "PostgreSQL", "Supabase", "Paystack"],
    link: "https://github.com/IncreasonJr/IncPay",
  },
  {
    number: "02",
    title: "CLUTCH",
    description:
      "Football match predictor with 78% accuracy. Feature-engineered from 10+ seasons of data.",
    tech: ["Next.js", "PyTorch", "XGBoost", "FastAPI", "Python", "Pandas"],
    link: "https://github.com/IncreasonJr/CLUTCH",
  },
  {
    number: "03",
    title: "DULY",
    description:
      "Multi-tenant dues collection platform for Ho Technical University. Paystack integration, treasury analytics, and secure onboarding.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Node.js", "Express", "Supabase", "Paystack"],
    link: "https://github.com/christliebdela/Duly",
  },
  {
    number: "04",
    title: "Auto Commit Gen",
    description:
      "VS Code extension for AI-powered commit messages. Rule-based local mode with optional Ollama, OpenAI, and Claude support.",
    tech: ["TypeScript", "VS Code API", "Ollama", "OpenAI", "Claude"],
    link: "https://github.com/IncreasonJr/AUTOMATIC_COMMIT_MESSAGE_GENERATOR",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 sm:py-32 md:py-40 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 scroll-mt-20">
      {/* Section Header */}
      <div className="mb-16 sm:mb-20">
        <span className="text-xs font-mono uppercase tracking-widest text-foreground/50 mb-3 block">
          FEATURED WORK
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Four projects, four problems solved.
        </h2>
      </div>

      {/* Editorial List */}
      <div className="border-t border-foreground/10">
        {PROJECTS.map((project) => (
          <div
            key={project.number}
            className="group py-10 sm:py-14 border-b border-foreground/10 transition-colors duration-200 hover:bg-foreground/[0.02] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
              {/* Left Side: Number + Title + Description */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-baseline space-x-4">
                  <span className="text-xs sm:text-sm font-mono text-foreground/40 shrink-0">
                    {project.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-foreground/60 leading-relaxed pl-8 sm:pl-9">
                  {project.description}
                </p>
              </div>

              {/* Right Side: Tech Tags + Source Link */}
              <div className="lg:col-span-5 flex flex-col lg:items-end justify-between gap-4 pl-8 sm:pl-9 lg:pl-0">
                {/* Tech Tags */}
                <div className="flex flex-wrap lg:justify-end gap-x-3 gap-y-1 text-xs font-mono text-foreground/50">
                  {project.tech.map((t, idx) => (
                    <span key={t}>
                      {t}
                      {idx < project.tech.length - 1 && <span className="text-foreground/20 ml-3">·</span>}
                    </span>
                  ))}
                </div>

                {/* Source Code Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group/link mt-1"
                >
                  <span>Source Code</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
