/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/ui-kit/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom button styles
      colors: {
        primary: {
          DEFAULT: '#4EADFF',
          hover: '#3B9EF3',
        },
        secondary: {
          DEFAULT: '#6B7280',
          hover: '#4B5563',
        },
      },
      // Custom spacing for components
      spacing: {
        button: '0.75rem 1.5rem',
        dropdown: '0.5rem 1rem',
      },
      // Custom border radius
      borderRadius: {
        button: '0.375rem',
        dropdown: '0.25rem',
      },
      // Custom animations
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
