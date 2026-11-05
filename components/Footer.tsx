"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-foreground/10 py-10">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground/50">
        {/* Copyright */}
        <p>
          &copy; 2026 Delator Edudzi Caleb
        </p>

        {/* Subtle scroll-to-top button */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-2.5 rounded-full border border-foreground/20 hover:border-foreground/50 bg-background text-foreground/60 hover:text-foreground shadow-sm transition-all duration-200 z-40 focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </footer>
  );
}
