/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontWeight: {
        // Make bold less heavy for a cleaner look
        bold: '600',
      },
      fontSize: {
        // Slightly smaller display sizes with tighter leading
        xl: ['1.125rem', { lineHeight: '1.4' }],
        '2xl': ['1.375rem', { lineHeight: '1.35' }],
        '3xl': ['1.625rem', { lineHeight: '1.3' }],
        '4xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '5xl': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        '6xl': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
};
