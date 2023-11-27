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
      },
      colors: {
        'petition': {
          light: '#fcf5f9',
          DEFAULT: '#f000b8',
        },
        'manifesto': {
          light: '#f5f6ff',
          DEFAULT: '#0016f0',
        },
        'openletter': {
          light: '#f4fffb',
          DEFAULT: '#03d391',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
    // colors: {
    //   'petition': {
    //     light: '#fcf5f9',
    //     DEFAULT: '#f000b8',
    //   },
    //   'manifesto': {
    //     light: '#f5f6ff',
    //     DEFAULT: '#0016f0',
    //   },
    // },
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
        pacttheme: {
          ...require("daisyui/src/theming/themes")['[data-theme=light]'],
          '.table-bg-gradient': {
            'padding': '1.5rem',
            'background-image': 'linear-gradient(to bottom, #c1dfff, #ffac95)',
          },
          'petition': {
            light: '#fcf5f9',
            DEFAULT: '#f000b8',
          },
          'manifesto': {
            light: '#f5f6ff',
            DEFAULT: '#0016f0',
          },
          colors: {
            'petition': {
              light: '#fcf5f9',
              DEFAULT: '#f000b8',
            },
            'manifesto': {
              light: '#f5f6ff',
              DEFAULT: '#0016f0',
            },
          },
          '.progress-gradient::-webkit-progress-value': {
            '--tw-bg-opacity': '1',
            'background-image': 'linear-gradient(to right, #0016f0, #03d391)',
          },
          '.progress-gradient::-moz-progress-bar': {
            '--tw-bg-opacity': '1',
            'background-image': 'linear-gradient(to bottom, #0016f0, #03d391)',
          },
          '.progress-gradient:indeterminate': {
            '--progress-color': 'linear-gradient(to bottom, #0016f0, #03d391)',
          },
          table: {
            // 'background-image': 'linear-gradient(to bottom, #c1dfff, #ffac95)',
            ':where(tbody th, tbody td)': {
              'background-color': 'transparent'
            },
            ':where(thead, tfoot) :where(th, td)': {
              'background-color': 'transparent'
            }
          },
        }
      },
      'light',
      'dark',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  safelist: [
    'bg-petition',
    'bg-petition-light',
    'bg-manifesto',
    'bg-manifesto-light',
    'bg-openletter',
    'bg-openletter-light',
  ]
}
