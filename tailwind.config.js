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
        primary: '#8b5cf6', // Purple 500 - more vibrant
        secondary: '#3b82f6', // Blue 500 - more vibrant
        accent: '#ec4899', // Pink 500 - more vibrant
        success: '#10b981', // Emerald 500 - more vibrant
        warning: '#f59e0b', // Amber 500
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
