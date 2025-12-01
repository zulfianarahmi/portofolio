/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'Monaco', 'Menlo', 'monospace'],
      },
      colors: {
        'neon-green': '#00ff41',
        'neon-red': '#ff0040',
      },
    },
  },
  plugins: [],
}








