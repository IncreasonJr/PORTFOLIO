import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)",
        },
        glow: "var(--glow-color)",
        "gradient-glow": "rgba(59, 130, 246, 0.15)",
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(to right, #38bdf8, #3b82f6, #2563eb)",
        "gradient-hero": "linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s infinite alternate",
        "text-gradient": "text-gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 5px var(--glow-color), 0 0 10px var(--glow-color)" },
          "100%": { boxShadow: "0 0 20px var(--glow-color), 0 0 30px var(--glow-color)" },
        },
        "text-gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
