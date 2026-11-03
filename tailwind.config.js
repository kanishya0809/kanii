/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#030308",
          darker: "#06060f",
          dark: "#0b0c16",
          card: "rgba(13, 14, 26, 0.7)",
          purple: "#a855f7",
          "purple-neon": "#b026ff",
          blue: "#00f0ff",
          "blue-glow": "#38bdf8",
          green: "#00ff88",
          "green-toxic": "#10f596",
          pink: "#ff007f",
          yellow: "#eab308"
        }
      },
      fontFamily: {
        cyber: ['"Orbitron"', 'monospace', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(176, 38, 255, 0.5), 0 0 10px -2px rgba(176, 38, 255, 0.3)',
        'neon-blue': '0 0 25px -5px rgba(0, 240, 255, 0.5), 0 0 10px -2px rgba(0, 240, 255, 0.3)',
        'neon-green': '0 0 25px -5px rgba(16, 245, 150, 0.5), 0 0 10px -2px rgba(16, 245, 150, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-neon': '0 8px 32px 0 rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(0, 240, 255, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(176, 38, 255, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
