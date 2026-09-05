import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
],
  theme: {
    extend: {
      colors: {
        steel:  '#1C2B3A',
        iron:   '#374151',
        rust:   '#C84B31',
        fog:    '#F2F4F6',
        border: '#D1D5DB',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config