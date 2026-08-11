/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kibo: {
          blue: "#60607A",
          green: "#839958",
          orange: "#D57B03",
          cream: "#F4E2D0",
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

