/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: '#05050A',
          card: '#0D0E15',
          border: '#1F293D',
          hover: '#151824',
        },
        cyan: {
          DEFAULT: '#00E5FF',
          glow: 'rgba(0, 229, 255, 0.4)',
          dim: 'rgba(0, 229, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Orbitron', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Share Tech Mono', 'monospace'],
      },
      animation: {
        'glitch-slow': 'glitch 4s infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'equalizer': 'equalizer 1.2s infinite ease-in-out alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 16px rgba(0, 229, 255, 0.9))' },
        },
        equalizer: {
          '0%': { height: '30%' },
          '100%': { height: '100%' },
        },
      },
    },
  },
  plugins: [],
}
