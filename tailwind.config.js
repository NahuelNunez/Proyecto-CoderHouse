/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar"),
  ],
};
