"use client";

import { motion } from "framer-motion";
import { Terminal, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

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

const FEATURED_PROJECTS = [
  {
    id: "apex",
    title: "APEX - AI Agent Console",
    description:
      "A production-grade AI developer console featuring long-term vector memory integration and sandboxed execution environments. Integrates NVIDIA NIM for smart multi-model routing, helping developers run automated agent tasks securely in Docker containers.",
    tech: ["Next.js", "FastAPI", "Python", "NVIDIA NIM", "LangChain", "PostgreSQL", "Docker", "TypeScript"],
    impact: "Handles 50+ queries per day with <2s response time. Reduced task planning time by 40%.",
    github: "https://github.com/IncreasonJr/APEX",
    demo: "#",
    visualType: "apex",
  },
  {
    id: "clutch",
    title: "CLUTCH - Football Predictor",
    description:
      "A machine learning web application predicting football match outcomes with 78% accuracy. Engineers features from 10+ seasons of historical team metrics, player performance, head-to-head records, and live weather conditions, served via a FastAPI prediction engine.",
    tech: ["Next.js", "PyTorch", "XGBoost", "FastAPI", "Python", "Pandas", "Tailwind CSS"],
    impact: "Achieved 15% better accuracy than baseline ELO ratings.",
    github: "https://github.com/IncreasonJr/CLUTCH",
    demo: "#",
    visualType: "clutch",
  },
  {
    id: "commit-gen",
    title: "Auto Commit Gen - VS Code Extension",
    description:
      "An intelligent developer tool that generates conventional commit messages from staged diffs. Supports rule-based local offline modes, plus hybrid Fallbacks connecting Ollama, OpenAI, and Claude with 4 customizable message formatting styles.",
    tech: ["TypeScript", "VS Code API", "Ollama", "OpenAI", "Claude", "Git"],
    impact: "1,000+ downloads (projected), used by 50+ developers in testing.",
    github: "https://github.com/IncreasonJr/AUTOMATIC_COMMIT_MESSAGE_GENERATOR",
    demo: "#",
    visualType: "commit-gen",
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-highlight mx-auto rounded-full mb-4" />
          <p className="max-w-2xl mx-auto text-foreground/75 text-pretty text-sm sm:text-base">
            A showcase of production-grade systems combining machine learning capabilities with high-fidelity frontend and backend integrations.
          </p>
        </div>

        {/* Big Cards List */}
        <div className="space-y-20">
          {FEATURED_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row gap-10 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Side (Mock UI) */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-[500px] aspect-[4/3] rounded-2xl border border-card-border glass p-4 shadow-xl relative overflow-hidden group hover:border-accent/40 transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-highlight/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* MOCK UI RENDERING */}
                    {project.visualType === "apex" && <ApexMockUI />}
                    {project.visualType === "clutch" && <ClutchMockUI />}
                    {project.visualType === "commit-gen" && <CommitGenMockUI />}
                  </div>
                </div>

                {/* Details Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    <Sparkles className="w-4 h-4" />
                    <span>Featured Product</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-foreground/80 leading-relaxed text-pretty text-sm sm:text-base">
                    {project.description}
                  </p>

                  {/* Impact pill */}
                  <div className="flex items-start space-x-2.5 p-3.5 rounded-xl border border-accent/10 bg-accent/5 max-w-lg">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-foreground/90">
                      <strong>Impact:</strong> {project.impact}
                    </span>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-xs font-medium border border-card-border bg-card-bg text-foreground/80 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-4 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors py-2"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 1. MOCK APEX USER INTERFACE */
function ApexMockUI() {
  return (
    <div className="w-full h-full flex flex-col font-mono text-[10px] sm:text-[11px] leading-tight select-none">
      {/* OS style title bar */}
      <div className="flex items-center justify-between border-b border-card-border pb-2 mb-3">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-foreground/45 text-[9px] uppercase tracking-widest font-semibold">
          apex-agent-workspace
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 grid grid-cols-3 gap-3 overflow-hidden">
        {/* File tree */}
        <div className="border-r border-card-border pr-2 space-y-2 text-foreground/60 hidden sm:block">
          <div className="font-bold text-foreground/85 flex items-center space-x-1">
            <span>📁</span> <span>src/</span>
          </div>
          <div className="pl-3 flex items-center space-x-1 text-accent">
            <span>📄</span> <span>agent.py</span>
          </div>
          <div className="pl-3 flex items-center space-x-1">
            <span>📄</span> <span>db.py</span>
          </div>
          <div className="pl-3 flex items-center space-x-1">
            <span>📄</span> <span>server.py</span>
          </div>
          <div className="font-bold text-foreground/85 flex items-center space-x-1 pt-1">
            <span>📁</span> <span>sandbox/</span>
          </div>
          <div className="pl-3 flex items-center space-x-1 text-foreground/50">
            <span>🐳</span> <span>Dockerfile</span>
          </div>
        </div>

        {/* Logs terminal */}
        <div className="col-span-3 sm:col-span-2 flex flex-col justify-between bg-black/35 rounded-lg p-3 border border-card-border overflow-hidden">
          <div className="space-y-1.5 overflow-hidden text-foreground/85">
            <div className="text-foreground/40 flex justify-between">
              <span>SYSTEM LOGS</span>
              <span className="text-accent animate-pulse font-bold">● ONLINE</span>
            </div>
            <div className="flex items-start space-x-1">
              <span className="text-blue-400 font-semibold">[nim-router]</span>
              <span className="text-foreground/70">Selected llama3-70b (lat: 142ms)</span>
            </div>
            <div className="flex items-start space-x-1">
              <span className="text-accent font-semibold">[pgvector]</span>
              <span className="text-foreground/70">Retrieved 2 context nodes, th: 0.82</span>
            </div>
            <div className="flex items-start space-x-1">
              <span className="text-green-400 font-semibold">[docker-sandbox]</span>
              <span className="text-foreground/70">Running Python script safely...</span>
            </div>
            <div className="text-green-500 font-semibold pl-4">
              &gt; Output: Process completed. (0.8s)
            </div>
          </div>

          <div className="flex items-center space-x-1 text-accent pt-2 border-t border-card-border/50">
            <Terminal className="w-3.5 h-3.5 shrink-0" />
            <span className="animate-pulse">agent_console_listener:~$ _</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. MOCK CLUTCH OUTCOMES PREDICTOR */
function ClutchMockUI() {
  return (
    <div className="w-full h-full flex flex-col font-sans select-none justify-between">
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-card-border pb-2.5 mb-2">
        <span className="text-xs font-bold text-foreground/90 flex items-center space-x-1.5">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span>Match Analytics Engine</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-[9px] font-bold tracking-wide uppercase border border-green-500/20">
          Accuracy: 78%
        </span>
      </div>

      {/* Main card panel */}
      <div className="bg-black/25 rounded-xl border border-card-border p-4 flex-1 flex flex-col justify-between">
        {/* Team Vs */}
        <div className="flex justify-between items-center text-center">
          <div className="w-1/3">
            <div className="text-xl sm:text-2xl">🦁</div>
            <div className="text-xs font-bold text-foreground/90 mt-1">London FC</div>
            <div className="text-[10px] text-foreground/50">Form: W-W-D-W</div>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <span className="text-xs font-semibold text-highlight">VS</span>
            <span className="text-[10px] text-foreground/40 mt-0.5">Heavy Rain (85% Hum)</span>
          </div>
          <div className="w-1/3">
            <div className="text-xl sm:text-2xl">🦅</div>
            <div className="text-xs font-bold text-foreground/90 mt-1">Rome Athletic</div>
            <div className="text-[10px] text-foreground/50">Form: D-L-W-D</div>
          </div>
        </div>

        {/* Prediction Bar */}
        <div className="space-y-1.5 mt-3 sm:mt-0">
          <div className="flex justify-between text-[10px] font-bold text-foreground/75">
            <span>Win: 68%</span>
            <span>Draw: 12%</span>
            <span>Win: 20%</span>
          </div>
          <div className="w-full h-3.5 bg-card-border rounded-full overflow-hidden flex">
            <div className="h-full bg-accent" style={{ width: "68%" }} />
            <div className="h-full bg-foreground/35" style={{ width: "12%" }} />
            <div className="h-full bg-highlight" style={{ width: "20%" }} />
          </div>
        </div>

        {/* Machine Learning Features Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-[9px] text-foreground/60 border-t border-card-border/50 pt-2.5 mt-2">
          <div className="p-1 rounded bg-card-bg/20 border border-card-border/30">
            <div className="font-bold text-foreground/80">XGBoost weight</div>
            <div>Team Form (0.42)</div>
          </div>
          <div className="p-1 rounded bg-card-bg/20 border border-card-border/30">
            <div className="font-bold text-foreground/80">PyTorch Logit</div>
            <div>Player index (1.84)</div>
          </div>
          <div className="p-1 rounded bg-card-bg/20 border border-card-border/30">
            <div className="font-bold text-foreground/80">ELO Delta</div>
            <div>Baseline (+145)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3. MOCK COMMIT GEN EDITOR */
function CommitGenMockUI() {
  return (
    <div className="w-full h-full flex flex-col font-mono text-[10px] sm:text-[11px] leading-tight select-none">
      {/* Tab bar bar */}
      <div className="flex items-center justify-between border-b border-card-border pb-2 mb-2">
        <div className="flex items-center space-x-1.5">
          <span className="text-red-400">●</span>
          <span className="text-yellow-400">●</span>
          <span className="text-green-400">●</span>
        </div>
        <span className="text-foreground/50 text-[9px] font-bold uppercase tracking-wider flex items-center space-x-1">
          <span>VS Code Diff</span>
        </span>
        <div className="w-6" />
      </div>

      <div className="flex-1 flex flex-col space-y-2.5 overflow-hidden">
        {/* Editor diff pane */}
        <div className="bg-black/35 rounded-lg p-2.5 border border-card-border space-y-1 overflow-hidden">
          <div className="text-[9px] text-foreground/45 pb-1 border-b border-card-border/40 mb-1 flex justify-between">
            <span>git diff --staged</span>
            <span className="text-accent">lib/api.ts</span>
          </div>
          <div className="bg-red-950/20 text-red-400 pl-1.5 rounded-sm">
            - const data = await fetch(ENDPOINT);
          </div>
          <div className="bg-green-950/20 text-green-400 pl-1.5 rounded-sm">
            + const data = await fallbackProvider.fetch(ENDPOINT);
          </div>
          <div className="bg-green-950/20 text-green-400 pl-1.5 rounded-sm">
            {'+ if (!data) throw new Error("Fallback failed");'}
          </div>
        </div>

        {/* Extension generation window */}
        <div className="glass p-3 rounded-lg border border-accent/20 space-y-2 shadow-lg relative bg-card-bg/90">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-accent tracking-wider uppercase">
              Auto Commit Gen Output
            </span>
            <span className="px-1.5 py-0.5 rounded bg-accent/15 text-accent text-[9px] font-bold uppercase">
              Claude Hybrid
            </span>
          </div>

          <div className="bg-black/55 rounded p-2 text-foreground/90 font-bold border border-card-border flex items-center justify-between">
            <span>feat: implement fallbackProvider query with error handling</span>
            <span className="text-[9px] px-1 py-0.5 rounded bg-card-border font-normal text-foreground/50">
              Copied!
            </span>
          </div>

          {/* Quick choices */}
          <div className="flex space-x-1.5 text-[8px] sm:text-[9px]">
            <span className="px-1.5 py-0.5 rounded bg-accent text-accent-foreground font-semibold cursor-pointer">
              Conventional
            </span>
            <span className="px-1.5 py-0.5 rounded bg-card-border text-foreground/70 cursor-pointer">
              Emoji
            </span>
            <span className="px-1.5 py-0.5 rounded bg-card-border text-foreground/70 cursor-pointer">
              Short
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
