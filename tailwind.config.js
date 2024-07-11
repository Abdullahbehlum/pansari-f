/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        lightgray: "#f5f5f5",
        cgray: "#f1f1f1",
        fgray: "#ccc",
        btngreen: "#00483c",
        footerbg: "#209779",
        lgreen: "#219515",
        lblues: "#b0e8e2",
        progray: "#ececec",
      },
      borderColor: {
        green: "#00483c",
        progray: "#ececec",
        lgreen: "#219515",
      },
      colors: {
        loggray: "#666",
        logreen:"#00483c",
        lsgreen:"#219515"
      },
    },
  },
  plugins: [],
  darkMode: ["selector", '[data-mode="dark"]'],
};
