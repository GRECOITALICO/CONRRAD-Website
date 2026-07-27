/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1220',
        paper: '#F7F8FA',
        line: '#D8DEE8',
        mute: '#5C6578',
        accent: '#1B3A5F',
        accentSoft: '#E8EEF5',
        gold: '#8A734A',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
}
