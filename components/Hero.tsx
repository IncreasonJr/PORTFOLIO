"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import MagneticHireButton from "@/components/MagneticHireButton";

const ROLES = [
  "Building AI Products",
  "Full-Stack Architect",
  "LLM Specialist",
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
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 md:left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 md:right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full bg-highlight/10 blur-[100px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg/60 border border-card-border mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-foreground/90">
            Open for Freelance &amp; Remote Projects
          </span>
        </motion.div>

        {/* Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-8 relative flex justify-center"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent/30 shadow-md p-1 relative group">
            <img
              src="/me.jpeg"
              alt="Delator Edudzi Caleb"
              className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Title / Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6"
        >
          <span className="block text-foreground mb-2">Delator Edudzi Caleb</span>
          <span className="block bg-gradient-to-r from-[#38bdf8] via-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent py-1">
            AI Engineer &amp; Full-Stack Developer
          </span>
        </motion.h1>

        {/* Typing Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="h-10 text-lg sm:text-2xl font-medium text-foreground/80 mb-6 flex items-center justify-center"
        >
          <span className="mr-2 text-foreground/60">Focused on</span>
          <span className="text-accent font-semibold border-r-2 border-accent pr-1 animate-pulse">
            {currentText}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-foreground/75 text-pretty mb-10"
        >
          Developing intelligent platforms, model training integrations, and scalable web architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, "#projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold shadow-md hover:opacity-90 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            View My Work
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-card-border bg-card-bg/60 font-semibold shadow-sm hover:bg-card-border/50 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            Contact Me
            <Mail className="w-4 h-4 ml-2 text-accent group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>

        {/* Magnetic "Hire Me" Focal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-6 sm:mt-7 flex justify-center"
        >
          <MagneticHireButton />
        </motion.div>
      </div>
    </section>
  );
}
