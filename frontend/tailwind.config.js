/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["Exo", "sans-serif"],
        secondary: ["Montserrat", "sans-serif"],
        third: ["Share Tech", "sans-serif"],
      },
    },
  },
  plugins: [],
};
