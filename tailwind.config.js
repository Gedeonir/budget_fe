/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
      fontFamily: {
        'custom': ['Poppins', 'sans-serif'],
      },
      colors:{
        primary:'#F1F5F9',
        secondary:'#26B2AB',
        primary2:"#ffffff",
        red:"#DC2626",
        success:'#12A347',
        text_primary:"#65758B",
        list_hover:"#0F172A"
      }
    },
    
  }