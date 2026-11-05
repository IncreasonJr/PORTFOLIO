"use client";

import React from "react";

export default function BackgroundAtmosphere() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Fine Organic Film Grain Texture (Tactile Luxury Matte Paper Finish) */}
      <div
        className="absolute inset-0 opacity-[0.028] dark:opacity-[0.038] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Flowing Topographic Contour Lines / Elevation Ribbons (Organic SVG Vector Waves) */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] text-foreground pointer-events-none">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 960"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Contour Line 1 */}
          <path
            d="M-100 160 C 240 80, 520 280, 880 140 C 1180 20, 1380 220, 1600 150"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Contour Line 2 */}
          <path
            d="M-100 280 C 220 200, 560 420, 940 260 C 1240 130, 1420 340, 1600 270"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Contour Line 3 */}
          <path
            d="M-100 420 C 280 340, 620 540, 1020 380 C 1300 240, 1460 460, 1600 400"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Contour Line 4 */}
          <path
            d="M-100 580 C 240 480, 580 700, 980 540 C 1280 400, 1440 620, 1600 560"
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Contour Line 5 */}
          <path
            d="M-100 740 C 300 640, 660 840, 1060 680 C 1340 540, 1480 760, 1600 700"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Contour Line 6 */}
          <path
            d="M-100 890 C 260 790, 600 980, 1020 830 C 1320 700, 1460 900, 1600 840"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* 3. Top-Right Ambient Lamp Glow (Atmospheric Cone from Lamp Pull-Cord) */}
      <div
        className="absolute -top-36 right-[-8%] w-[820px] h-[820px] rounded-full blur-[140px] opacity-35 dark:opacity-22 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 178, 110, 0.45) 0%, rgba(140, 110, 90, 0.16) 45%, transparent 75%)",
        }}
      />

      {/* 4. Center-Left Soft Accent Glow (Subtle depth behind projects) */}
      <div
        className="absolute top-[42%] -left-48 w-[680px] h-[680px] rounded-full blur-[150px] opacity-20 dark:opacity-12 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 75%)",
        }}
      />

      {/* 5. Bottom-Right Ambient Warmth (Framing the Contact area) */}
      <div
        className="absolute -bottom-36 right-[-10%] w-[780px] h-[780px] rounded-full blur-[160px] opacity-30 dark:opacity-18 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 178, 110, 0.4) 0%, rgba(107, 92, 92, 0.12) 50%, transparent 75%)",
        }}
      />

      {/* 6. Soft Cinematic Edge Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.35) 100%)",
        }}
      />

      {/* 7. Precision Editorial Crosshairs (+) at key architectural coordinates */}
      <div className="absolute top-24 left-8 text-foreground/20 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute top-24 right-16 text-foreground/20 font-mono text-xs select-none pointer-events-none hidden sm:block">
        +
      </div>
      <div className="absolute top-[45%] left-10 text-foreground/20 font-mono text-xs select-none pointer-events-none hidden md:block">
        +
      </div>
      <div className="absolute top-[45%] right-10 text-foreground/20 font-mono text-xs select-none pointer-events-none hidden md:block">
        +
      </div>
      <div className="absolute bottom-28 left-8 text-foreground/20 font-mono text-xs select-none pointer-events-none">
        +
      </div>
      <div className="absolute bottom-28 right-16 text-foreground/20 font-mono text-xs select-none pointer-events-none hidden sm:block">
        +
      </div>

    </div>
  );
}
