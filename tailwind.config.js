const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    fontFamily: {
        'sans': ['var(--font-roboto)', ...fontFamily.sans],
        'title': ['var(--font-chillax)', ...fontFamily.sans],
        'alt': ['var(--font-array)', ...fontFamily.sans]
    },
      width: {
        '128': '32rem',
      }
    },
    container: {
      center: true,
    }
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp'),
  ],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
