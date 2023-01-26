/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./lib/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "f1-red": "#e10600",
        "f1-dark": "#15151e",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
