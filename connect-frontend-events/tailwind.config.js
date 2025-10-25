export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'type-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'blink-cursor': {
          '0%': { opacity: '1' }, // Start visible
          '50%': { opacity: '0' }, // Blink
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'type-in': 'type-in 0.1s ease-in forwards',
        'blink-cursor': 'blink-cursor 0.5s step-end 3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
