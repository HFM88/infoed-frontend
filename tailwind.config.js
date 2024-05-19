/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs", "./dist/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        headings: ["OmnyBold", "sans-serif"],
        paragraphs: ["LibreFranklin", "sans-serif"],
      },
      colors: {
        'text': '#eae6eb',
        'background': '#0d090e',
        'primary': '#c8a0ce',
        'secondary': '#6b2f74',
        'accent': '#b446c6',
        gray: "#1e1e1e",
        lightgray: "	#4d4d4d",
        subtext: "#d1e0e3",
      },
    },
  },
  plugins: [require("./tw-plugins/component-loader/index.js"), require("tailwind-scrollbar"),],
};
