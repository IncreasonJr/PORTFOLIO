"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Briefcase } from "lucide-react";

interface MagneticHireButtonProps {
  href?: string;
  className?: string;
}

export default function MagneticHireButton({
  href = "#contact",
  className = "",
}: MagneticHireButtonProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isInZone, setIsInZone] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check user preference for reduced motion
  const shouldReduceMotion = useReducedMotion();

  // Detect touch devices to preserve standard native tap behavior
  useEffect(() => {
    const hasTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouchDevice(hasTouch);
  }, []);

  // Motion values for target pull, scale, and 3D tilt
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const targetRotateX = useMotionValue(0);
  const targetRotateY = useMotionValue(0);
  const targetRotateZ = useMotionValue(0);

  // Responsive, elastic Venom-style spring physics for button translation
  const buttonSpringConfig = {
    damping: 15,
    stiffness: 160,
    mass: 0.55,
  };

  const x = useSpring(targetX, buttonSpringConfig);
  const y = useSpring(targetY, buttonSpringConfig);

  // Stretchy, looser spring for the "Venom tendril" aura that reaches out ahead
  const auraX = useSpring(useTransform(targetX, (val) => val * 1.45), {
    damping: 12,
    stiffness: 130,
    mass: 0.75,
  });
  const auraY = useSpring(useTransform(targetY, (val) => val * 1.45), {
    damping: 12,
    stiffness: 130,
    mass: 0.75,
  });

  // 3D tilt springs
  const rotateX = useSpring(targetRotateX, { damping: 18, stiffness: 190 });
  const rotateY = useSpring(targetRotateY, { damping: 18, stiffness: 190 });
  const rotateZ = useSpring(targetRotateZ, { damping: 20, stiffness: 180 });

  // Scale spring
  const scale = useSpring(targetScale, { damping: 18, stiffness: 220 });

  // Parallax for inner text (slightly counter-shifts for tactile 3D depth)
  const textX = useTransform(x, (val) => -val * 0.22);
  const textY = useTransform(y, (val) => -val * 0.22);

  // Parallax for icon (shifts forward with movement)
  const iconX = useTransform(x, (val) => val * 0.18);
  const iconY = useTransform(y, (val) => val * 0.18);

  useEffect(() => {
    if (shouldReduceMotion || isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!anchorRef.current) return;

      // Always use stationary anchorRef center to prevent jitter/oscillation loops
      const rect = anchorRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      const magneticRadius = 240; // Expanded ~240px wide magnetic field

      if (distance < magneticRadius) {
        // Proximity curve: 0 at outer edge, 1 at center
        const proximity = 1 - distance / magneticRadius;
        const maxDisplacement = 38; // Increased max displacement for a stronger physical pull
        const smoothEase = Math.pow(proximity, 0.75);
        const pullStrength = maxDisplacement * smoothEase;

        const dirX = deltaX / (distance || 1);
        const dirY = deltaY / (distance || 1);

        targetX.set(dirX * pullStrength);
        targetY.set(dirY * pullStrength);

        // 3D Tilt calculation (tilts towards the cursor)
        const maxTilt = 12;
        targetRotateX.set(-dirY * maxTilt * smoothEase);
        targetRotateY.set(dirX * maxTilt * smoothEase);
        targetRotateZ.set(dirX * dirY * 6 * smoothEase);

        targetScale.set(isHovered ? 1.05 : 1.03);
        setIsInZone(true);
      } else {
        targetX.set(0);
        targetY.set(0);
        targetRotateX.set(0);
        targetRotateY.set(0);
        targetRotateZ.set(0);
        targetScale.set(1);
        setIsInZone(false);
      }
    };

    const handleMouseLeaveDoc = () => {
      targetX.set(0);
      targetY.set(0);
      targetRotateX.set(0);
      targetRotateY.set(0);
      targetRotateZ.set(0);
      targetScale.set(1);
      setIsInZone(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveDoc);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
    };
  }, [shouldReduceMotion, isTouchDevice, isHovered, targetRotateX, targetRotateY, targetRotateZ, targetScale, targetX, targetY]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
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
      } else {
        window.location.hash = href;
      }
    }
  };

  return (
    <div
      ref={anchorRef}
      style={{ perspective: 1000 }}
      className={`relative inline-flex items-center justify-center select-none touch-manipulation ${className}`}
    >
      {/* Minimal magnetic aura glow (reaches out subtly toward cursor) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : auraX,
          y: shouldReduceMotion ? 0 : auraY,
        }}
        animate={{
          opacity: isHovered ? 0.35 : isInZone ? 0.2 : 0,
          scale: isHovered ? 1.08 : isInZone ? 1.04 : 0.96,
        }}
        transition={{ duration: 0.2 }}
        className="absolute -inset-2 rounded-full bg-foreground/15 blur-lg pointer-events-none"
      />

      {/* Main Magnetic Button — Minimal Outlined Aesthetic */}
      <motion.a
        href={href}
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          targetScale.set(1.05);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          targetScale.set(isInZone ? 1.03 : 1);
        }}
        style={{
          x: shouldReduceMotion ? 0 : x,
          y: shouldReduceMotion ? 0 : y,
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          rotateZ: shouldReduceMotion ? 0 : rotateZ,
          scale: shouldReduceMotion ? 1 : scale,
          transformStyle: "preserve-3d",
        }}
        whileTap={{ scale: 0.96 }}
        aria-label="Hire Delator Edudzi Caleb - Available for freelance and remote opportunities"
        className="group relative inline-flex items-center justify-center px-9 py-4 sm:px-11 sm:py-4.5 rounded-full border border-foreground/25 hover:border-foreground/60 bg-foreground/[0.04] hover:bg-foreground/[0.09] text-foreground font-semibold text-base sm:text-lg tracking-tight transition-colors duration-200 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
      >
        {/* Subtle interior highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/[0.04] pointer-events-none" />

        {/* 3D Floating Content Layer */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : textX,
            y: shouldReduceMotion ? 0 : textY,
            transform: "translateZ(15px)",
          }}
          className="relative z-10 flex items-center justify-center"
        >
          {/* Button Text */}
          <span className="font-semibold tracking-tight text-base sm:text-lg">
            Hire Me
          </span>

          {/* Briefcase Icon */}
          <motion.span
            style={{
              x: shouldReduceMotion ? 0 : iconX,
              y: shouldReduceMotion ? 0 : iconY,
            }}
            className="flex items-center"
          >
            <Briefcase className="w-5 h-5 ml-2.5 text-foreground/80 group-hover:text-foreground transition-colors duration-200" />
          </motion.span>
        </motion.div>
      </motion.a>
    </div>
  );
}
