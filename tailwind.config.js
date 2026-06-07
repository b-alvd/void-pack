/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Geist", "system-ui", "sans-serif"],
      },
      colors: { ink: "#0a0a0b", paper: "#f4f1ea", violet: "#7c3aed", muted: "#8b8b8b" },
    },
  },
  plugins: [],
};
