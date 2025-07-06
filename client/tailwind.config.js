/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // For React or other JS/TS files
  ],  
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'], 
      },      
    },
  },
  plugins: [],
};
