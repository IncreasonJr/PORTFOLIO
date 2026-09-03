"use client";

import { Sparkles, FolderGit2 } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    id: "apex",
    title: "APEX",
    tagline: "Flagship AI Developer Console",
    description:
      "Production-grade AI developer console with NVIDIA NIM integration, vector memory with pgvector, and sandboxed Docker execution.",
    tech: ["Next.js", "FastAPI", "Python", "NVIDIA NIM", "LangChain", "PostgreSQL", "Docker", "TypeScript"],
    github: "https://github.com/IncreasonJr/APEX",
    isFlagship: true,
  },
  {
    id: "clutch",
    title: "CLUTCH",
    tagline: "Match Outcomes Predictor",
    description:
      "Football match predictor with 78% accuracy. Feature-engineered from 10+ seasons of data. Deployed as real-time API.",
    tech: ["Next.js", "PyTorch", "XGBoost", "FastAPI", "Python", "Pandas"],
    github: "https://github.com/IncreasonJr/CLUTCH",
    isFlagship: false,
  },
  {
    id: "commit-gen",
    title: "Auto Commit Gen",
    tagline: "VS Code Extension",
    description:
      "VS Code extension for AI-powered commit messages. Rule-based local mode with optional Ollama, OpenAI, Claude support.",
    tech: ["TypeScript", "VS Code API", "Ollama", "OpenAI", "Claude", "Git"],
    github: "https://github.com/IncreasonJr/AUTOMATIC_COMMIT_MESSAGE_GENERATOR",
    isFlagship: false,
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative scroll-mt-20 border-t border-card-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full mb-4" />
          <p className="max-w-xl mx-auto text-foreground/75 text-sm sm:text-base">
            Focused, production-ready AI systems and software developer tooling.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl p-6 md:p-7 bg-card-bg/50 border ${
                project.isFlagship ? "border-accent/40 shadow-sm" : "border-card-border"
              } flex flex-col justify-between h-full transition-colors duration-200 hover:border-accent/50`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  {project.isFlagship ? (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                      <Sparkles className="w-3 h-3 mr-1" />
                      <span>{project.tagline}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-medium tracking-wider text-foreground/60 bg-card-border/40 px-2.5 py-1 rounded-full">
                      <FolderGit2 className="w-3 h-3 mr-1" />
                      <span>{project.tagline}</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags & Source Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-card-border/40">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-card-border/30 text-foreground/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl border border-card-border bg-card-bg/80 text-sm font-semibold text-foreground/90 hover:text-accent hover:border-accent/40 transition-colors duration-200"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
