"use client";

import { Code2, Brain, Server, Layout, Wrench } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3"],
    className: "",
  },
  {
    title: "AI/ML",
    icon: Brain,
    skills: ["PyTorch", "XGBoost", "scikit-learn", "Pandas", "NumPy", "LangChain", "RAG"],
    className: "",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["FastAPI", "Flask", "Express.js", "Node.js", "PostgreSQL", "Supabase", "Paystack"],
    className: "",
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    className: "",
  },
  {
    title: "Dev Tools",
    icon: Wrench,
    skills: ["Docker", "Git", "VS Code API", "Vercel", "Render", "Ollama", "OpenAI API", "Claude API"],
    className: "md:col-span-2 lg:col-span-2",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative scroll-mt-20 border-t border-card-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Technical Expertise
          </h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full mb-4" />
          <p className="max-w-xl mx-auto text-foreground/75 text-sm sm:text-base">
            Core technologies and tools utilized across systems engineering and AI development.
          </p>
        </div>

        {/* 5 Grouped Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className={`p-6 rounded-2xl bg-card-bg/50 border border-card-border flex flex-col justify-between transition-colors duration-200 hover:border-accent/40 ${category.className}`}
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-4">
                    <Icon className="w-4 h-4 text-accent shrink-0" />
                    <h3 className="text-base font-bold text-accent tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-card-border/30 border border-card-border/50 text-foreground/85 hover:border-accent/40 hover:text-accent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
