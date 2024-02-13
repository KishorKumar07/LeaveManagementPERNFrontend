/**  @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'leave-count': '0 0 5px 1px rgba(0, 0, 0, 0.1)',
        'right': '3px 0 6px rgba(0, 0, 0, 0.2)',
        "prof":"0px 0px 1px 0px rgba(0, 0, 0, 0.5)",
        "prof1":"0px 0px 1px 0px rgba(0, 0, 0, 2)",
        'top-bottom': '0 -3px 3px -2px rgba(0, 0, 0, 0.1), 0 3px 3px -2px rgba(0, 0, 0, 0.1);',
      },
      fontSize: {
        "vsm" : "12px",
        '2xl': '1.75rem', 
        '3xl': '2rem',   
        "sbar": "15px" ,
        "formText" :"14px"
      },
      colors:{
        "scolor":"black",
        "blue":" #DAA520",
        "darkblue":"#00008b",
        "magicblue":"#2E5090",
        "background":"	#F5F5F5",
        "form":" #bfbfbf",
        "table":"#E4E5E8",
        "tableHead":"#8493A0",
        "arrow":"40px",
        "green":"#22dd22",
        "darkgreen":"#027148",
        "goldenrod":"#DAA520"


      },
      padding: {
        '60': '60px',
        '70':"70px"
      },
      
      margin:{
       "50":"50px" 
      },
      height:{
        100:"100px",

      },
      weight:{
        100:"100px",

      }
      
    },
  },
  plugins: [],
};
