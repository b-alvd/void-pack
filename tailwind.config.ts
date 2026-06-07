import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0a0a0b",
        paper: "#f4f1ea",
        accent: "#d4ff3f",
        muted: "#8b8b8b",
      },
    },
  },
  plugins: [],
} satisfies Config;
