import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f6f4',
          100: '#eeecea',
          200: '#dbd7d2',
          300: '#c3bdb4',
          400: '#a99f94',
          500: '#968a7d',
          600: '#897b6f',
          700: '#73675d',
          800: '#5f554e',
          900: '#4e4641',
          950: '#292422',
        },
        navy: {
          50: '#f4f6f7',
          100: '#e3e7eb',
          200: '#cad2d9',
          300: '#a5b2be',
          400: '#788a9c',
          500: '#5d6f81',
          600: '#505d6d',
          700: '#454f5b',
          800: '#3d454e',
          900: '#161b22',
          950: '#0d1117',
        },
        gold: {
          50: '#fdfbe9',
          100: '#fcf6c6',
          200: '#f9eb8f',
          300: '#f5da4f',
          400: '#efc620',
          500: '#c9a213',
          600: '#a37d0e',
          700: '#825b0f',
          800: '#6c4813',
          900: '#5c3b15',
          950: '#351e07',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 162, 19, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 162, 19, 0.6)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

