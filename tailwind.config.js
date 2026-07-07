/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Noto Serif SC", "Songti SC", "serif"],
      },
      colors: {
        ink: "#1e2a24",
        rice: "#f7f3ea",
        cinnabar: "#b7432f",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(30, 42, 36, 0.12)",
      },
    },
  },
  plugins: [],
};
