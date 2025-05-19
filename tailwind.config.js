/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          '50': 'var(--color-primary-50)',
          '100': 'var(--color-primary-100)',
          '200': 'var(--color-primary-200)',
          '300': 'var(--color-primary-300)',
          '400': 'var(--color-primary-400)',
          '500': 'var(--color-primary-500)',
          '600': 'var(--color-primary-600)',
          '700': 'var(--color-primary-700)',
          '800': 'var(--color-primary-800)',
          '900': 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary)',
        },
        secondary: {
          '50': 'var(--color-secondary-50)',
          '100': 'var(--color-secondary-100)',
          '200': 'var(--color-secondary-200)',
          '300': 'var(--color-secondary-300)',
          '400': 'var(--color-secondary-400)',
          '500': 'var(--color-secondary-500)',
          '600': 'var(--color-secondary-600)',
          '700': 'var(--color-secondary-700)',
          '800': 'var(--color-secondary-800)',
          '900': 'var(--color-secondary-900)',
          DEFAULT: 'var(--color-secondary)',
        },
        slate: {
          '50': 'var(--color-slate-50)',
          '100': 'var(--color-slate-100)',
          '200': 'var(--color-slate-200)',
          '300': 'var(--color-slate-300)',
          '400': 'var(--color-slate-400)',
          '500': 'var(--color-slate-500)',
          '600': 'var(--color-slate-600)',
          '700': 'var(--color-slate-700)',
          '800': 'var(--color-slate-800)',
          '900': 'var(--color-slate-900)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
    },
  },
  plugins: [],
} 