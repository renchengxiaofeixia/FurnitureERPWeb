/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    "ag-theme-balham":{
      "ag-odd-row-background-color": '#764141'
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
