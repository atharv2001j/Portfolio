/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0F",
        panel: "#0F0F14",
        surface: "#12121A",
        border: "#22222E",
        accent: "#3DFF9A",
        "accent-dim": "#2BC97A",
        muted: "#8A8A99",
        text: "#E4E4EC",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #0A0A0F), linear-gradient(rgba(61,255,154,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,255,154,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { top: "0%", opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        scan: "scan 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
