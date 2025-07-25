/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleur primaire - Sophistication premium
        'digiqo-primary': '#8B1431',          // Bordeaux principal
        'digiqo-primary-light': '#A51844',    // Bordeaux clair (hover)
        'digiqo-primary-dark': '#6B0F26',     // Bordeaux foncé (footer)
        
        // Couleur accent - Actions et CTA
        'digiqo-accent': '#DA6530',           // Orange vif
        'digiqo-accent-light': '#E67A47',     // Orange clair (hover)
        'digiqo-accent-dark': '#C5521F',      // Orange foncé (active)
        
        // Couleur secondaire - Structure
        'digiqo-secondary': '#199CB7',        // Bleu clair
        'digiqo-secondary-dark': '#127387',   // Bleu foncé
        
        // Neutres
        'digiqo-white': '#FFFFFF',
        'digiqo-gray-light': '#F8F9FA',       // Backgrounds alternatifs
        'digiqo-gray': '#E9E9E9',             // Bordures
        'digiqo-gray-dark': '#6C757D',        // Texte secondaire
        'digiqo-black': '#212529',            // Texte sur fond clair
        
        // Aliases pour compatibilité
        'digiqo-orange': '#DA6530',           // Alias de accent
        'digiqo-blue-light': '#199CB7',       // Alias de secondary
        'digiqo-blue-dark': '#127387',        // Alias de secondary-dark
        'digiqo-bordeaux': '#8B1431',         // Alias de primary
      },
      fontFamily: {
        'display': ['Nunito', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-orange': 'glowOrange 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px -10px #8B1431' },
          to: { boxShadow: '0 0 20px 10px #8B1431' },
        },
        glowOrange: {
          from: { boxShadow: '0 0 10px -10px #DA6530' },
          to: { boxShadow: '0 0 30px 15px rgba(218, 101, 48, 0.3)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(0.98)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: 1 },
          '100%': { transform: 'scale(2)', opacity: 0 },
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
      backgroundImage: {
        'gradient-digiqo': 'linear-gradient(135deg, #8B1431 0%, #6B0F26 100%)',
        'gradient-digiqo-reverse': 'linear-gradient(135deg, #6B0F26 0%, #8B1431 100%)',
        'gradient-accent': 'linear-gradient(135deg, #DA6530 0%, #C5521F 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #199CB7 0%, #127387 100%)',
        'gradient-overlay': 'linear-gradient(180deg, transparent 0%, rgba(139, 20, 49, 0.1) 100%)',
      },
      boxShadow: {
        'digiqo': '0 8px 24px rgba(139, 20, 49, 0.15)',
        'digiqo-lg': '0 12px 32px rgba(139, 20, 49, 0.2)',
        'accent': '0 8px 24px rgba(218, 101, 48, 0.3)',
        'accent-lg': '0 12px 32px rgba(218, 101, 48, 0.4)',
      },
    },
  },
  plugins: [],
}