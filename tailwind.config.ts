import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          cream: "#faf8f5",
          "cream-warm": "#f8f6f2",
          blush: "#f5e6e8",
          sage: "#e8f0e8",
          sky: "#e6eef5",
          lavender: "#ede8f5",
          peach: "#f5ebe0",
          mint: "#e0f0eb",
        },
        accent: {
          gold: "#c9a962",
          rose: "#b8737a",
          forest: "#5a7a5a",
          "winner-green": "#15803d",
          "loser-red": "#b91c1c",
        },
        card: {
          bg: "#faf7f4",
          border: "#e8e2dc",
          winner: "#4a7c59",
          "winner-muted": "#e8f0e8",
          loser: "#9b7a6a",
          "loser-muted": "#f5ebe8",
          score: "#eae6e2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(0,0,0,0.05), 0 6px 16px -4px rgba(0,0,0,0.04)",
        card: "0 1px 3px rgba(0,0,0,0.04), 0 6px 20px -4px rgba(0,0,0,0.06)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.04), 0 12px 24px -4px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
