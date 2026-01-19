/** @type {import('tailwindcss').Config} */
export default {
  // Ensure Tailwind includes classes used in HTML/JS/CSS
  content: [
    "./index.html",
    "./assets/**/*.{css,js}",
    "./**/*.html",
    "./**/*.js",
  ],
  // Use class strategy so toggling `html.dark` works (not OS media)
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
