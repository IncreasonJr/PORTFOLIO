"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MagneticHireButton from "@/components/MagneticHireButton";

export default function Hero() {
  const [imgSrc, setImgSrc] = useState<string | null>("/me.jpeg");

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
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-12 sm:py-16 md:py-20 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20"
    >
      {/* Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto py-6 sm:py-8">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-7 sm:space-y-8 order-2 lg:order-1">
          {/* Top small kicker */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-widest text-foreground/50 block"
          >
            AI Engineer &amp; Full-Stack Developer
          </motion.span>

          {/* Graded Headline */}
          <div className="space-y-3 sm:space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.02]"
            >
              Hi, I&apos;m Caleb.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground/75 leading-[1.18] text-balance"
            >
              I build AI products and full-stack applications.
            </motion.h2>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-foreground/60 max-w-xl font-normal leading-relaxed"
          >
            Available for work · Remote
          </motion.p>

          {/* Minimal Magnetic Hire Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="pt-2 flex items-center gap-4"
          >
            <MagneticHireButton href="#contact" />
          </motion.div>
        </div>

        {/* Right Column: Much Bigger Circular Portrait Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center w-full order-1 lg:order-2"
        >
          {/* Concentric Layered Circular Frame */}
          <div className="relative group p-3 sm:p-4 rounded-full border border-foreground/10 bg-gradient-to-b from-foreground/[0.05] to-transparent shadow-2xl">
            {/* Ambient Glow */}
            <div className="absolute inset-0 rounded-full bg-foreground/[0.03] group-hover:bg-foreground/[0.06] blur-2xl transition-all duration-700 pointer-events-none" />

            {/* Inner Circular Portrait — Significantly Expanded */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] lg:w-[440px] lg:h-[440px] xl:w-[490px] xl:h-[490px] rounded-full overflow-hidden border border-foreground/15 bg-foreground/5 shadow-inner">
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt="Delator Edudzi Caleb"
                  fill
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 420px, 490px"
                  onError={() => setImgSrc(null)}
                  className="object-cover object-[center_18%] filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-foreground/[0.04] text-foreground/40 font-mono text-sm">
                  <span>Your Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Small Caption */}
          <p className="text-xs font-mono text-foreground/50 mt-4 text-center">
            Delator Edudzi Caleb · Ghana
          </p>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="pt-8 sm:pt-12">
        <a
          href="#projects"
          onClick={(e) => handleScroll(e, "#projects")}
          className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-foreground/40 hover:text-foreground/80 transition-colors"
        >
          Scroll to explore ↓
        </a>
      </div>
    </section>
  );
}
