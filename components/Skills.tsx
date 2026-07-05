"use client";

import { motion } from "framer-motion";
import { Brain, Database, Layout, Terminal } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Core Languages",
    icon: Terminal,
    color: "text-slate-500 border-slate-500/20 bg-slate-500/5",
    glowColor: "rgba(148, 163, 184, 0.15)",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "PHP",
      "Java",
      "C++",
      "HTML5",
    ],
  },
  {
    title: "AI, ML & Data Science",
    icon: Brain,
    color: "text-accent border-accent/20 bg-accent/5",
    glowColor: "rgba(56, 189, 248, 0.15)",
    skills: [
      "PyTorch",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "HuggingFace",
      "LangChain",
      "RAG",
      "NVIDIA NIM",
      "Vector Databases (pgvector)",
    ],
  },
  {
    title: "Frontend & Backend",
    icon: Layout,
    color: "text-blue-500 border-blue-500/20 bg-blue-500/5",
    glowColor: "rgba(59, 130, 246, 0.15)",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "Express",
      "PostgreSQL",
      "Docker",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    title: "DevOps & Developer Tools",
    icon: Database,
    color: "text-highlight border-highlight/20 bg-highlight/5",
    glowColor: "rgba(56, 189, 248, 0.15)",
    skills: [
      "Render",
      "VS Code Extension API",
      "Git",
      "Vercel",
      "Railway",
      "AWS",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Technical Expertise
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-highlight mx-auto rounded-full mb-4" />
          <p className="max-w-2xl mx-auto text-foreground/75 text-pretty text-sm sm:text-base">
            A comprehensive overview of my tools, languages, and specialized domains across artificial intelligence, systems, and frontend engineering.
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="glass p-6 sm:p-8 rounded-2xl glow-hover relative overflow-hidden group"
                style={{
                  "--glow-color": category.glowColor,
                } as React.CSSProperties}
              >
                {/* Visual Category Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-xl border ${category.color} transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Badges/Pills Wrap */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-card-border bg-card-bg text-foreground/90 transition-all duration-200 hover:border-accent hover:text-accent cursor-default shadow-sm hover:shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
