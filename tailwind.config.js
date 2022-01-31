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
        "staytard-yellow": "#ffeb00",
        "staytard-pink": "#EA4262",
        "staytard-dark": "#222222",
        "staytard-red": "#ce1e1a",
        "staytard-light-gray": "#f3f3f3",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
