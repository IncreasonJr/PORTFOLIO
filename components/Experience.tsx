"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

const TIMELINE_DATA = [
  {
    role: "AI Engineer / Full-Stack Developer",
    company: "Freelance",
    period: "2026",
    type: "work",
    description:
      "Design and build customized production-ready artificial intelligence integrations and responsive web platforms. Lead development on API routing systems (APEX), predictive scoring applications (CLUTCH), and developer extensions (Auto Commit Gen) for clients in fintech and edtech.",
  },
  {
    role: "Software Developer",
    company: "Previous Role",
    period: "2025",
    type: "work",
    description:
      "Collaborated in teams to deploy robust frontend applications, build data pipelines, and manage cloud services. Developed administrative layouts and optimized query systems using React, Node.js, Python, and SQL databases.",
  },
  {
    role: "Computer Science Student / Self-Taught Dev",
    company: "Academics & Personal Projects",
    period: "2024",
    type: "education",
    description:
      "Formed strong foundations in programming fundamentals, algorithms, database designs, and system architectures. Built library queues (BookNest), client landing pages (Landmark Legacy), and progressive offline systems.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative scroll-mt-20 border-t border-card-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Professional Timeline
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-highlight mx-auto rounded-full mb-4" />
          <p className="max-w-xl mx-auto text-foreground/75 text-pretty text-sm sm:text-base">
            A look back at my progression from initial development studies to engineering production-grade full-stack systems.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-card-border pl-6 sm:pl-8 space-y-12 ml-2 sm:ml-4">
          {TIMELINE_DATA.map((item, index) => {
            const IsWork = item.type === "work";
            const Icon = IsWork ? Briefcase : GraduationCap;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Timeline Bubble Icon */}
                <span className="absolute -left-[39px] sm:-left-[47px] top-1.5 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-card-border bg-background text-accent shadow-sm">
                  <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                </span>

                {/* Card Container */}
                <div className="glass p-6 rounded-2xl glow-hover relative">
                  {/* Period tag */}
                  <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-accent mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                    {item.role}
                  </h3>
                  <h4 className="text-sm font-semibold text-foreground/70 mb-4">
                    {item.company}
                  </h4>

                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed text-pretty">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
