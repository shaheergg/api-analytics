/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111113",
        secondary: "#18191b",
        white: "#edeef0",
        typeface: "#B4B4B4",
        separator: "#3A3A3A",
        accent: "#6E56CF",
        accenthover: "#6E6ADE",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
