/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc', // Slate 50
        surface: '#ffffff',
        primary: '#64748b', // Slate 500
        secondary: '#94a3b8', // Slate 400
        accent: '#f472b6', // Pink 400
        success: '#4ade80', // Green 400
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
