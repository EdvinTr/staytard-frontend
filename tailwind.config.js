module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        13: ["13px", "18px"],
      },
      colors: {
        "staytard-yellow": "#FFDD02",
        "staytard-pink": "#EA4262",
        "staytard-dark": "#222222",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
