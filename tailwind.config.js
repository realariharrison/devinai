/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // The Sovereign Standard Palette
        midnight: {
          DEFAULT: '#03045E',
          50: '#0A0B8C',
          100: '#08097A',
          200: '#060768',
          300: '#050656',
          400: '#040544',
          500: '#03045E',
          600: '#020332',
          700: '#010220',
          800: '#01010E',
          900: '#000000',
        },
        boardroom: {
          DEFAULT: '#00B4D8',
          50: '#5CE5FF',
          100: '#47E1FF',
          200: '#1ED8FF',
          300: '#00C9F4',
          400: '#00BEE6',
          500: '#00B4D8',
          600: '#008DAA',
          700: '#00677C',
          800: '#00414E',
          900: '#001B20',
        },
        cloud: {
          DEFAULT: '#90E0EF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#E8F9FC',
          300: '#C7F0F7',
          400: '#ACE8F3',
          500: '#90E0EF',
          600: '#5DD2E7',
          700: '#2AC4DF',
          800: '#1A9DB4',
          900: '#147685',
        },
        vault: {
          DEFAULT: '#CAF0F8',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#E7F9FC',
          500: '#CAF0F8',
          600: '#97E2F0',
          700: '#64D4E8',
          800: '#31C6E0',
          900: '#1BA5BC',
        },
      },
      fontFamily: {
        serif: ['var(--font-ibm-plex-serif)', 'serif'],
        sans: ['var(--font-ibm-plex-sans)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      fontSize: {
        'display-1': ['3rem', { lineHeight: '1.1', letterSpacing: '0' }],
        'display-2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
        'display-3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.3px' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'commission': 'commission 0.9s ease-out forwards',
        'grow-line': 'growLine 2s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        commission: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        growLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'prose': '80ch',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 180, 216, 0.2)',
        'glow': '0 0 20px rgba(0, 180, 216, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 180, 216, 0.4)',
      },
    },
  },
  plugins: [],
}
