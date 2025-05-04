/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0a192f", // Background color for navbar
      },
      fontFamily: {
        inter: ['"Inter"', "sans-serif"], // Add the Inter font family
      },
    },
  },
  plugins: [],
}

