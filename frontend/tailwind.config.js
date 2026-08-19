/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f1115',
          800: '#171a21',
          700: '#232832',
        },
        accent: {
          500: '#3b82f6', // blue
          400: '#60a5fa',
        }
      }
    },
  },
  plugins: [],
}
