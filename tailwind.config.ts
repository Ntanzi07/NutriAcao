/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      textStrokeWidth: {
        DEFAULT: '1px',
        2: '2px',
        4: '4px',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        alumni: ['"Alumni Sans Pinstripe"', 'sans-serif'],
      },
      colors: {
        "black-100": "#2B2C35",
        "primary-green": "#bfff91",
        "primary-color": "#c6c99d",
        "secondary-color":"#70663e",
        "primary-bg": "rgba(15, 15, 15, 1)",
        "secundary-bg": "rgba(30, 30, 30, 1)",
        "userText-bg": "rgba(45, 45, 45, 1)",
      },
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/Videos/HeroTest.mp4')"
      }
    },
  },
  plugins: [require('tailwindcss-text-stroke')],
};