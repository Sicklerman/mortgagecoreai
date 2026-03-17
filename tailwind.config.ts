import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0D1F3C",
        "blue-deep": "#1E3A5F",
        steel: "#2E5F9A",
        gold: "#C8A951",
        "gold-lt": "#E8C96A",
        "off-white": "#F5F7FA",
        "dark-text": "#1A2332",
        muted: "#64748B",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0D1F3C 0%, #1E3A5F 50%, #0D1F3C 100%)",
        "gold-gradient": "linear-gradient(135deg, #C8A951, #E8C96A)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
