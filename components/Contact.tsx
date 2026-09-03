"use client";

import { Mail } from "lucide-react";

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

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative scroll-mt-20 border-t border-card-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Get In Touch
          </h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full mb-4" />
          <p className="max-w-md mx-auto text-foreground/75 text-sm sm:text-base">
            Feel free to reach out directly via email or connect with me on social platforms.
          </p>
        </div>

        {/* Minimal Social Buttons List */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          {/* Email Button */}
          <a
            href="mailto:delatorcaleb3@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-card-bg/60 border border-card-border hover:border-accent/50 text-foreground/90 hover:text-accent font-semibold transition-all duration-200 shadow-sm"
          >
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <span className="text-sm">delatorcaleb3@gmail.com</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/caleb-delator-78675b411"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-card-bg/60 border border-card-border hover:border-accent/50 text-foreground/90 hover:text-accent font-semibold transition-all duration-200 shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5 text-accent shrink-0" />
            <span className="text-sm">LinkedIn</span>
          </a>

          {/* GitHub Button */}
          <a
            href="https://github.com/IncreasonJr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-card-bg/60 border border-card-border hover:border-accent/50 text-foreground/90 hover:text-accent font-semibold transition-all duration-200 shadow-sm"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5 text-accent shrink-0" />
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
