module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        13: ["13px", "18px"],
        xss: ["10px", "16px"],
      },
      screens: {
        "3xl": "1792px",
      },
      colors: {
        "app-yellow": "#ffeb00",
        "app-pink": "#EA4262",
        "app-dark": "#222222",
        "app-red": "#ce1e1a",
        "app-light-gray": "#f3f3f3",
        "app-semi-light-gray": "#F8F8F9",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
