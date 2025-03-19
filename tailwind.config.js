/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'], // Fuente para títulos
        raleway: ['Raleway', 'sans-serif'],     // Fuente para texto general
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar"),
  ],
};
