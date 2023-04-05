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
    },
    // '.table :where(tbody th, tbody td)': {
    //   'background-color': 'transparent'
    // }
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          '.table-bg-gradient': {
            'padding': '1.5rem',
            'background-image': 'linear-gradient(to bottom, #c1dfff, #ffac95)',
          },
          table: {
            // 'background-image': 'linear-gradient(to bottom, #c1dfff, #ffac95)',
            ':where(tbody th, tbody td)': {
              'background-color': 'transparent'
            },
            ':where(thead, tfoot) :where(th, td)': {
              'background-color': 'transparent'
            }
          }
        }
      },
      'light',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
