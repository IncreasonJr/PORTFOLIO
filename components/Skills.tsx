"use client";

const SKILL_CATEGORIES = [
  {
    title: "AI/ML",
    skills: ["PyTorch", "LangChain", "RAG"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Flask"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "React", "Tailwind"],
  },
  {
    title: "Dev Tools",
    skills: ["Docker", "Git", "VS Code API"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative scroll-mt-20 border-t border-card-border/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* 4 Grouped Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-2xl bg-card-bg/50 border border-card-border flex flex-col justify-between"
            >
              <h3 className="text-base font-bold text-accent mb-4 tracking-tight">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-card-border/30 border border-card-border/50 text-foreground/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
