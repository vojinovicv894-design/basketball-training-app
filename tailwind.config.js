/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'basketball-orange': '#FF6B35',
        'basketball-dark': '#1A1A1A',
        'court-green': '#2D5016'
      }
    },
  },
  plugins: [],
}
