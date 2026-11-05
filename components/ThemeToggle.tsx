"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-foreground/10 opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-foreground/10 hover:border-foreground/30 text-foreground/70 hover:text-foreground transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-foreground/80" />
      ) : (
        <Moon className="w-4 h-4 text-foreground/80" />
      )}
    </button>
  );
}
