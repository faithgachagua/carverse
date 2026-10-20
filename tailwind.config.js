/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0908',
          900: '#0f0e0c',
          850: '#141311',
          800: '#1a1815',
          700: '#242119',
          600: '#332e24',
        },
        gold: {
          400: '#f0c869',
          500: '#e8b84b',
          600: '#d4a537',
          700: '#b8872a',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(232,184,75,0.15), 0 8px 24px -8px rgba(232,184,75,0.25)',
      },
    },
  },
  plugins: [],
}
