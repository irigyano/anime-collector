/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        winter: "rgb(37 99 235)",
        spring: "rgb(34 197 94)",
        summer: "rgb(220 38 38)",
        autumn: "rgb(234 88 12)",
      },
      animation: {
        BgFloat: "BackgroundFloat 5s infinite",
      },
      keyframes: {
        BackgroundFloat: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      backgroundSize: {
        "4x": "400%",
      },
    },
  },
  plugins: [],
};
