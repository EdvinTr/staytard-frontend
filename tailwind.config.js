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
        "staytard-semi-light-gray": "#F8F8F9",
        "deep-blue": "#1C202E",
        "deep-blue-darker": "#161A24",
        success: "#00AD5E",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
