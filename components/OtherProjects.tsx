"use client";

import { motion } from "framer-motion";
import { Folder } from "lucide-react";

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

const OTHER_PROJECTS = [
  {
    title: "BookNest - Library System",
    description:
      "Full-stack Flask application with role-based access control. Features a reservation queue with automatic 48-hour holds, email notifications, and an admin statistics dashboard integrated with Chart.js.",
    tech: ["Flask", "Python", "SQLAlchemy", "PostgreSQL", "Chart.js", "JS"],
    github: "https://github.com/IncreasonJr/Library_Management_System",
    demo: "#",
  },
  {
    title: "Landmark Legacy School",
    description:
      "A premium client website built with security-first practices (strict CSP, XSS protection). Implements a responsive lightbox gallery, a contact drawer, and a persistent custom communication widget.",
    tech: ["HTML5", "Vanilla CSS", "JavaScript", "Figma", "SEO", "Web Security"],
    github: "https://github.com/IncreasonJr/LANDMARK_LEGACY_SCHOOL",
    demo: "#",
  },
  {
    title: "Slide App Pro",
    description:
      "Offline-first PWA for creating and presenting slides. Built with React, Service Workers for offline caching, and IndexedDB for local data persistence. Features touch gestures, smooth transitions, and mobile optimization.",
    tech: ["React", "PWA", "Service Workers", "IndexedDB", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/IncreasonJr/Slide_App_Pro",
    demo: "#",
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

export default function OtherProjects() {
  return (
    <section className="py-20 relative border-t border-card-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            More Noteworthy Projects
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-accent to-highlight mx-auto rounded-full mb-4" />
          <p className="max-w-xl mx-auto text-foreground/75 text-pretty text-xs sm:text-sm">
            A selection of web platforms, utility extensions, and responsive solutions built to client specifications.
          </p>
        </div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {OTHER_PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass p-6 rounded-2xl glow-hover flex flex-col justify-between h-full relative group"
            >
              <div>
                {/* Header icons */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 rounded-xl border border-accent/15 bg-accent/5 text-accent group-hover:scale-110 transition-transform">
                    <Folder className="w-5 h-5" />
                  </div>
                </div>

                {/* Project Info */}
                <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed text-pretty mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tech list footer & Link */}
              <div className="flex flex-col gap-4 pt-4 border-t border-card-border/40">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-card-border/30 text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                    aria-label={`${project.title} Source Code`}
                  >
                    <span>Source Code</span>
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
