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
        ink: "#f8fbff",
        muted: "#a8b4c6",
        cyan: "#3de5ff",
        gold: "#ffbd73",
        rose: "#ff5c9c",
        green: "#95f2be",
        night: "#05070b"
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
