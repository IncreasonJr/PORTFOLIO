"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

interface FlipCalendarCardProps {
  category: string;
  skills: string[];
  syncTrigger?: number;
  initialDelay?: number;
  interval?: number;
  activeSkillIndex?: number;
  onSelectSkill?: (index: number) => void;
}

export default function FlipCalendarCard({
  category,
  skills,
  syncTrigger,
  initialDelay = 0,
  interval = 2400,
  activeSkillIndex,
  onSelectSkill,
}: FlipCalendarCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(skills.length > 1 ? 1 : 0);
  const [, setIsFlipping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Structural 3D layer refs
  const leafRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const rearRef = useRef<HTMLDivElement>(null);
  const underRef = useRef<HTMLDivElement>(null);
  const faceShadeRef = useRef<HTMLDivElement>(null);
  const underShadeRef = useRef<HTMLDivElement>(null);

  // Synchronous DOM text/progress refs for zero-flash content swaps
  const faceWordRef = useRef<HTMLSpanElement>(null);
  const faceNoRef = useRef<HTMLSpanElement>(null);
  const faceProgressRef = useRef<HTMLDivElement>(null);
  const underWordRef = useRef<HTMLSpanElement>(null);
  const underNoRef = useRef<HTMLSpanElement>(null);
  const underProgressRef = useRef<HTMLDivElement>(null);

  const isFlippingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevTriggerRef = useRef(syncTrigger);
  const animRef = useRef<Animation | null>(null);

  const total = skills.length;

  // Ultra-smooth physical 352° page flip with synchronous DOM painting
  const executeFlip = useCallback(
    (targetNext: number) => {
      if (isFlippingRef.current || total <= 1) return;
      if (targetNext === currentIndex) return;

      const leaf = leafRef.current;
      const face = faceRef.current;
      const rear = rearRef.current;
      const faceShade = faceShadeRef.current;
      const underShade = underShadeRef.current;

      if (!leaf || !face || !rear) {
        setCurrentIndex(targetNext);
        setNextIndex((targetNext + 1) % total);
        onSelectSkill?.(targetNext);
        return;
      }

      isFlippingRef.current = true;
      setIsFlipping(true);

      // 0. Ensure the under sheet is pre-painted with targetNext BEFORE leaf lifts
      if (underWordRef.current) {
        underWordRef.current.textContent = skills[targetNext];
      }
      if (underNoRef.current) {
        underNoRef.current.textContent = `${String(targetNext + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      }
      if (underProgressRef.current) {
        underProgressRef.current.style.width = `${((targetNext + 1) / total) * 100}%`;
      }

      // Check prefers-reduced-motion
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        if (faceWordRef.current) faceWordRef.current.textContent = skills[targetNext];
        if (faceNoRef.current) {
          faceNoRef.current.textContent = `${String(targetNext + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
        }
        setCurrentIndex(targetNext);
        setNextIndex((targetNext + 1) % total);
        setIsFlipping(false);
        isFlippingRef.current = false;
        onSelectSkill?.(targetNext);
        return;
      }

      // Cancel any running animations cleanly
      try {
        leaf.getAnimations({ subtree: true }).forEach((a) => a.cancel());
        underShade?.getAnimations().forEach((a) => a.cancel());
      } catch {}

      const FLIP_DURATION = 920;

      // 1. Leaf: Rotates smoothly through 352 degrees over the rings and drops behind the stack
      const anim = leaf.animate(
        [
          { transform: "translateZ(2px) rotateX(0deg)" },
          { transform: "translateZ(2px) rotateX(352deg)" },
        ],
        {
          duration: FLIP_DURATION,
          easing: "cubic-bezier(0.5, 0.05, 0.2, 1)",
          fill: "forwards",
        }
      );
      animRef.current = anim;

      // 2. Front face: visible up to ~100 degrees (offset 0.285), then turns edge-on as rear takes over
      face.animate(
        [
          { opacity: 1 },
          { opacity: 1, offset: 0.285 },
          { opacity: 0, offset: 0.295 },
          { opacity: 0 },
        ],
        { duration: FLIP_DURATION, easing: "linear", fill: "forwards" }
      );

      // 3. Rear face: catches overhead specular light cresting the rings, then drops smoothly into shadow
      rear.animate(
        [
          { filter: "brightness(1)" },
          { filter: "brightness(1.08)", offset: 0.29 },
          { filter: "brightness(0.95)", offset: 0.48 },
          { filter: "brightness(0.86)" },
        ],
        { duration: FLIP_DURATION, easing: "linear", fill: "forwards" }
      );

      // 4. Face curl shadow: soft dynamic shading as paper curls away
      if (faceShade) {
        faceShade.animate(
          [
            { opacity: 0 },
            { opacity: 0.45, offset: 0.2 },
            { opacity: 0, offset: 0.285 },
            { opacity: 0 },
          ],
          { duration: FLIP_DURATION, easing: "linear", fill: "forwards" }
        );
      }

      // 5. Under sheet shadow: starts in shadow and clears smoothly as the top page lifts away
      if (underShade) {
        underShade.animate(
          [{ opacity: 0.65 }, { opacity: 0 }],
          {
            duration: FLIP_DURATION * 0.9,
            easing: "cubic-bezier(0.3, 0.6, 0.4, 1)",
            fill: "forwards",
          }
        );
      }

      anim.onfinish = () => {
        // A. SYNCHRONOUSLY PAINT THE DOM of the face to targetNext
        // BEFORE canceling the animation transform!
        if (faceWordRef.current) {
          faceWordRef.current.textContent = skills[targetNext];
        }
        if (faceNoRef.current) {
          faceNoRef.current.textContent = `${String(targetNext + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
        }
        if (faceProgressRef.current) {
          faceProgressRef.current.style.width = `${((targetNext + 1) / total) * 100}%`;
        }

        // B. NOW cancel animation - leaf snaps back to 0deg,
        // and its DOM ALREADY MATCHES what the user saw on the under sheet!
        try {
          leaf.getAnimations({ subtree: true }).forEach((a) => a.cancel());
          underShade?.getAnimations().forEach((a) => a.cancel());
        } catch {}

        // C. SYNCHRONOUSLY prime the under sheet with the subsequent skill
        const upcoming = (targetNext + 1) % total;
        if (underWordRef.current) {
          underWordRef.current.textContent = skills[upcoming];
        }
        if (underNoRef.current) {
          underNoRef.current.textContent = `${String(upcoming + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
        }
        if (underProgressRef.current) {
          underProgressRef.current.style.width = `${((upcoming + 1) / total) * 100}%`;
        }

        // D. Sync React state in background
        setCurrentIndex(targetNext);
        setNextIndex(upcoming);
        setIsFlipping(false);
        isFlippingRef.current = false;
        onSelectSkill?.(targetNext);
      };
    },
    [currentIndex, total, skills, onSelectSkill]
  );

  const nextSkill = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (isFlippingRef.current || total <= 1) return;
      const target = (currentIndex + 1) % total;
      executeFlip(target);
    },
    [currentIndex, total, executeFlip]
  );

  const prevSkill = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (isFlippingRef.current || total <= 1) return;
      const target = (currentIndex - 1 + total) % total;
      executeFlip(target);
    },
    [currentIndex, total, executeFlip]
  );

  // Synchronized Master Trigger from parent
  useEffect(() => {
    if (syncTrigger !== undefined && syncTrigger !== prevTriggerRef.current) {
      prevTriggerRef.current = syncTrigger;
      if (!isPaused && !isFlippingRef.current) {
        const target = (currentIndex + 1) % total;
        executeFlip(target);
      }
    }
  }, [syncTrigger, isPaused, currentIndex, total, executeFlip]);

  // Sync external selection from badge clicks
  useEffect(() => {
    if (
      activeSkillIndex !== undefined &&
      activeSkillIndex !== currentIndex &&
      !isFlippingRef.current
    ) {
      executeFlip(activeSkillIndex);
    }
  }, [activeSkillIndex, currentIndex, executeFlip]);

  // Fallback standalone timer only when syncTrigger is not provided
  useEffect(() => {
    if (syncTrigger !== undefined || total <= 1) return;

    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        if (!isPaused && !isFlippingRef.current) {
          const target = (currentIndex + 1) % total;
          executeFlip(target);
        }
      }, interval);
    };

    if (initialDelay > 0 && currentIndex === 0 && !isFlippingRef.current) {
      const delayTimer = setTimeout(() => {
        startTimer();
      }, initialDelay);
      return () => {
        clearTimeout(delayTimer);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else {
      startTimer();
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [syncTrigger, currentIndex, isPaused, initialDelay, interval, total, executeFlip]);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) {
        animRef.current.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const currentSkill = skills[currentIndex] ?? "";
  const upcomingSkill = skills[nextIndex] ?? "";

  // Exact multi-layered paper stack box-shadow from therishithakor.com
  const paperStackShadow =
    "0 1px 0 #d8d4cb, 0 2px 0 #f6f4ef, 0 3px 0 #d0cbc1, 0 4px 0 #f2f0ea, 0 5px 0 #c8c3b8, 0 6px 0 #e9e6df, 0 7px 0 #aaa498, 0 16px 28px -6px rgba(0,0,0,0.38)";

  return (
    <div
      className="relative select-none w-full max-w-[320px] sm:max-w-[360px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Perspective Stage: Angled view showing depth and flip arc */}
      <div
        style={{
          perspective: 1000,
          perspectiveOrigin: "35% 15%",
        }}
        onClick={() => nextSkill()}
        className="cursor-pointer group relative h-[152px] sm:h-[162px] w-full"
        title="Click to flip to next skill"
      >
        {/* Tilted Calendar 3D Scene Root:
            - Tilted to the side with rotateY(-15deg) and rotateX(10deg)
            - Preserves 3D tilt on hover with subtle gentle lift
        */}
        <div
          style={{
            transform: "rotateX(10deg) rotateY(-15deg)",
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
        >
          {/* Desk Stand Backboard (Behind paper stack) */}
          <div
            style={{
              transform: "translateZ(-10px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute -inset-1.5 sm:-inset-2 rounded-2xl bg-gradient-to-b from-[#2e2a28] via-[#1d1b1a] to-[#11100f] border border-white/10 shadow-[0_22px_44px_-12px_rgba(0,0,0,0.65),0_8px_16px_-6px_rgba(0,0,0,0.5)]"
          >
            {/* Right edge 3D profile bevel catching ambient light in perspective */}
            <div className="absolute right-0 inset-y-0 w-2.5 rounded-r-2xl bg-gradient-to-l from-white/10 to-transparent border-r border-white/10 pointer-events-none" />
            {/* Bottom wooden stand bevel */}
            <div className="absolute inset-x-0 bottom-0 h-3 rounded-b-2xl bg-black/50 border-t border-white/10" />
          </div>

          {/* UNDER SHEET (Revealed seamlessly as top leaf flips over) */}
          <div
            ref={underRef}
            style={{
              transform: "translateZ(0px)",
              transformStyle: "preserve-3d",
              boxShadow: paperStackShadow,
            }}
            className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#fdfcf9] via-[#f7f5f0] to-[#eeeae2] border border-black/10 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-inner"
          >
            {/* Top Area: Punched Holes & Category Header */}
            <div>
              <div className="flex justify-between px-3 pt-0.5 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-[#1b1b1b] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-0.5px_1px_rgba(255,255,255,0.25)] border border-black/20"
                  />
                ))}
              </div>

              <div className="mt-3 border-b border-dashed border-black/15" />

              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-[#0a0a0a]/55 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {category}
                </span>
                <span
                  ref={underNoRef}
                  className="text-[#0a0a0a]/50 font-semibold tabular-nums tracking-[0.08em]"
                >
                  {String(nextIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Upcoming Skill Name (Inspo font & tight tracking) */}
            <div className="my-auto py-1">
              <span
                ref={underWordRef}
                style={{ letterSpacing: "-0.035em" }}
                className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-[#0a0a0a] block font-sans truncate leading-none"
              >
                {upcomingSkill}
              </span>
            </div>

            {/* Bottom Deck Meta */}
            <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs font-mono text-[#0a0a0a]/50">
              <span className="text-[11px] font-medium tracking-wide">Next up</span>
              <div className="w-24 bg-black/10 h-1 rounded-full overflow-hidden">
                <div
                  ref={underProgressRef}
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${((nextIndex + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Under Sheet Lift Shadow Overlay */}
            <div
              ref={underShadeRef}
              className="absolute inset-0 bg-black/40 pointer-events-none opacity-0"
            />
          </div>

          {/* FLIPPING LEAF (The physical paper page that turns over the spiral rings) */}
          <div
            ref={leafRef}
            style={{
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              willChange: "transform",
              transform: "translateZ(2px) rotateX(0deg)",
            }}
            className="absolute inset-0 rounded-xl pointer-events-none z-20"
          >
            {/* FRONT FACE of Flipping Page (Active Skill) */}
            <div
              ref={faceRef}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow: paperStackShadow,
              }}
              className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#fdfcf9] via-[#f7f5f0] to-[#eeeae2] border border-black/10 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-md"
            >
              <div>
                <div className="flex justify-between px-3 pt-0.5 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-[#1b1b1b] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-0.5px_1px_rgba(255,255,255,0.25)] border border-black/20"
                    />
                  ))}
                </div>

                <div className="mt-3 border-b border-dashed border-black/15" />

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-[#0a0a0a]/55 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {category}
                  </span>
                  <span
                    ref={faceNoRef}
                    className="text-[#0a0a0a]/50 font-semibold tabular-nums tracking-[0.08em]"
                  >
                    {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Current Active Skill Name (Inspo font & tight tracking) */}
              <div className="my-auto py-1">
                <span
                  ref={faceWordRef}
                  style={{ letterSpacing: "-0.035em" }}
                  className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-[#0a0a0a] block font-sans truncate leading-none"
                >
                  {currentSkill}
                </span>
              </div>

              {/* Bottom Deck Meta with Flip Prompt */}
              <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs font-mono text-[#0a0a0a]/50">
                <span className="flex items-center gap-1 text-[11px] font-medium tracking-wide">
                  <RotateCw className="w-3 h-3 text-accent opacity-75" />
                  Tap to flip
                </span>
                <div className="w-24 bg-black/10 h-1 rounded-full overflow-hidden">
                  <div
                    ref={faceProgressRef}
                    className="bg-accent h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Shading overlay on face */}
              <div
                ref={faceShadeRef}
                className="absolute inset-0 bg-black/35 pointer-events-none opacity-0"
              />
            </div>

            {/* REAR FACE of Flipping Page */}
            <div
              ref={rearRef}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
              className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#e9e6df] to-[#d9d5cc] border border-black/15 p-4 flex flex-col justify-between items-center overflow-hidden shadow-xl"
            >
              <div className="w-full flex justify-between px-3 pt-0.5">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-[#1b1b1b] opacity-40 shadow-inner"
                  />
                ))}
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#0a0a0a]/35 font-semibold">
                {category}
              </span>
              <div className="w-12 h-0.5 bg-black/10 rounded-full mb-1" />
            </div>
          </div>

          {/* PHYSICAL 3D SPIRAL BINDER RINGS */}
          <div
            style={{ transform: "translateZ(18px)" }}
            className="absolute -top-3.5 inset-x-0 px-3 flex justify-between pointer-events-none z-30"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Spiral Ring Coil with metallic chrome sheen */}
                <div className="w-2 h-6 sm:h-7 rounded-full bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 shadow-[0_2px_4px_rgba(0,0,0,0.35)] border-t border-b border-black/30" />
                <span className="w-1.5 h-1 bg-black/30 rounded-full blur-[0.5px] -mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini Controls Bar (Prev / Next Chevrons & Progress Track) */}
      <div className="mt-4 flex items-center justify-between px-2 text-xs font-mono text-foreground/50">
        <div className="flex items-center space-x-1.5">
          <button
            onClick={prevSkill}
            className="p-1 rounded-md hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            title="Previous skill"
            aria-label={`Previous ${category} skill`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={nextSkill}
            className="p-1 rounded-md hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            title="Next skill"
            aria-label={`Next ${category} skill`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Segmented Step Indicator */}
        <div className="flex items-center space-x-1">
          {skills.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                executeFlip(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "w-4 bg-accent"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to skill ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
