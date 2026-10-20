/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elwafa: {
          teal: {
            DEFAULT: '#009CA7',
            light: '#26B2BC',
            dark: '#00838C',
            subtle: '#E6F6F7',
          },
          ocean: {
            DEFAULT: '#003B46',
            dark: '#00262D',
            light: '#075260',
          },
          gold: {
            DEFAULT: '#EAB700',
            light: '#FFCA1A',
            dark: '#C69A00',
            subtle: '#FFF9E6',
          },
          surface: {
            DEFAULT: '#F7F9F8',
            subtle: '#EEF5F4',
            card: '#FFFFFF',
            border: '#DCE8E6',
          },
          text: {
            main: '#192A3D',
            muted: '#50626A',
            light: '#869CA5',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 59, 70, 0.06), 0 2px 6px -1px rgba(0, 59, 70, 0.04)',
        'elevated': '0 12px 32px -4px rgba(0, 59, 70, 0.12), 0 4px 12px -2px rgba(0, 59, 70, 0.06)',
      }
    },
  },
  plugins: [],
}
