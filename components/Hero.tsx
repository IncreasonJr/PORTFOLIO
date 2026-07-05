"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";

const ROLES = [
  "Building Intelligent Products",
  "ML Model Deployment",
  "LLM Specialist",
  "Full-Stack Architect",
];

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const fullText = ROLES[roleIndex];

    const tick = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Wait before starting to delete
          setIsDeleting(true);
          setSpeed(1500); // Wait time at the end of word
        } else {
          setSpeed(75 + Math.random() * 50); // Typing speed
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setSpeed(500); // Wait time before typing next word
        } else {
          setSpeed(40); // Deleting speed (faster)
        }
      }
    };

    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, speed]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background decoration - Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Electric Cyan Glow */}
        <div className="absolute top-1/4 left-10 md:left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-accent/15 blur-[100px] md:blur-[150px] animate-pulse" style={{ animationDuration: "10s" }} />
        {/* Dark Purple/Gold Glow */}
        <div className="absolute bottom-1/4 right-10 md:right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-highlight/10 blur-[100px] md:blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />

        {/* Floating geometric particles in CSS */}
        <div className="absolute inset-0 opacity-20 dark:opacity-40">
          <div className="absolute top-1/3 left-10 w-4 h-4 border border-accent rounded animate-float" style={{ animationDuration: "12s" }} />
          <div className="absolute top-1/4 right-12 w-6 h-6 border border-highlight/50 rounded-full animate-float" style={{ animationDuration: "18s" }} />
          <div className="absolute bottom-1/3 left-1/5 w-5 h-5 border-t border-l border-accent/70 rotate-45 animate-float" style={{ animationDuration: "15s" }} />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-highlight/60 rounded animate-float" style={{ animationDuration: "9s" }} />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge / Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass border border-card-border mb-6 shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
            Open for Freelance & Remote Projects
          </span>
        </motion.div>

        {/* Profile Image / Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-8 relative flex justify-center"
        >
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-accent/30 shadow-xl glass p-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-highlight opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
            <img
              src="/me.jpeg"
              alt="Delator Caleb Edudzi"
              className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        {/* Title / Animated gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          <span className="block text-foreground mb-2">I am Delator Caleb Edudzi, an</span>
          <span className="block bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent bg-200% animate-text-gradient py-1">
            AI Engineer & Full-Stack Dev
          </span>
        </motion.h1>

        {/* Typing Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-10 text-lg sm:text-2xl font-medium text-foreground/80 mb-6 flex items-center justify-center"
        >
          <span className="mr-1">Specialized in</span>
          <span className="text-accent font-semibold border-r-2 border-accent pr-1 animate-pulse">
            {currentText}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/75 text-pretty mb-10"
        >
          I am a FullStack AI Engineer focused on developing intelligent platforms. I love collaborating on Python projects, building systems from model training to UI, and I&apos;m more fun in person than my commit messages.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, "#projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-accent text-accent-foreground font-semibold shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-105 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            View My Work
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full glass border border-card-border font-semibold shadow-sm hover:bg-card-border transition-all duration-300 hover:scale-105 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            Contact Me
            <Mail className="w-4 h-4 ml-2 text-highlight group-hover:scale-110 transition-transform" />
          </a>

          <a
            href="/Delator_Caleb_CV.pdf"
            download="Delator_Caleb_CV.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full glass border border-card-border font-semibold shadow-sm hover:bg-card-border transition-all duration-300 hover:scale-105 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent text-foreground/90 hover:text-accent"
          >
            Download CV
            <Download className="w-4 h-4 ml-2 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
