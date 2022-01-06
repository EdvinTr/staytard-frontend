module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        "staytard-yellow": "#FFDD02",
        "staytard-pink": "#EA4262",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
