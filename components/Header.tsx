"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LampPullCord from "./LampPullCord";

const NAV_ITEMS = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <>
      {/* Interactive Lamp Pull-Cord (Light/Dark Toggle) */}
      <LampPullCord />

      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
          scrolled
            ? "bg-background/90 border-b border-foreground/10 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Left side: Mobile hamburger (on mobile) + Brand Name */}
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button: Positioned on the top-left on mobile */}
              <div className="flex sm:hidden items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 -ml-2 text-foreground/80 hover:text-foreground focus:outline-none cursor-pointer"
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              {/* Minimal Name / Brand */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="text-base font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity"
              >
                Delator Edudzi Caleb
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center space-x-8 pr-12 lg:pr-14">
              <nav className="flex items-center space-x-6 text-sm">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-foreground/70 hover:text-foreground transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="sm:hidden bg-background border-b border-foreground/10 px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-4 text-base font-medium">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-foreground/80 hover:text-foreground py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
