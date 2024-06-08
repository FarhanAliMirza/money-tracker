/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#18181B",
        royalblue: {
          50: "#f1f4fd",
          100: "#dfe7fa",
          200: "#c5d5f8",
          300: "#9ebbf2",
          400: "#7097ea",
          500: "#4169e1",
          600: "#3957d7",
          700: "#3044c5",
          800: "#2d39a0",
          900: "#29347f",
          950: "#1d224e",
        },
      },
    },
  },
  plugins: [],
};
