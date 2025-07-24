/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'digiqo-orange': '#DA6530',
        'digiqo-blue-light': '#199CB7',
        'digiqo-blue-dark': '#127387',
        'digiqo-bordeaux': '#8B1431',
        'digiqo-gray': '#E9E9E9',
      },
      fontFamily: {
        'display': ['Nunito', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px -10px #7C3AED' },
          to: { boxShadow: '0 0 20px 10px #7C3AED' },
        },
        slideUp: {
          from: { transform: 'translateY(100px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}