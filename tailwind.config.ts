import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink, 38 36 31) / <alpha-value>)",
        muted: "rgb(var(--muted, 113 107 97) / <alpha-value>)",
        cyan: "rgb(var(--accent, 81 76 66) / <alpha-value>)",
        gold: "rgb(var(--gold, 132 97 59) / <alpha-value>)",
        rose: "#a23d58",
        green: "#26744d",
        night: "rgb(var(--surface, 250 249 246) / <alpha-value>)"
      },
      boxShadow: {
        glow: "0 24px 70px rgba(0, 0, 0, 0.38)",
        cyan: "0 16px 48px rgba(61, 229, 255, 0.2)"
      },
      keyframes: {
        scan: {
          "0%": { top: "-24%" },
          "100%": { top: "110%" }
        },
        heroFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.7deg)" }
        },
        stripDrift: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-8%)" }
        },
        spinSlow: {
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" }
        },
        focusPulse: {
          "0%, 100%": { opacity: "0.36", transform: "scale(1)" },
          "50%": { opacity: "0.72", transform: "scale(0.985)" }
        }
      },
      animation: {
        scan: "scan 5s linear infinite",
        heroFloat: "heroFloat 8s ease-in-out infinite",
        heroFloatReverse: "heroFloat 9s ease-in-out infinite reverse",
        stripDrift: "stripDrift 16s linear infinite",
        spinSlow: "spinSlow 18s linear infinite",
        focusPulse: "focusPulse 4.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
