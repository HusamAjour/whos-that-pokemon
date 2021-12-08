const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      fighting: "#C22E28",
      flying: "#A98FF3",
      poison: "#A33EA1",
      ground: "#E2BF65",
      rock: "#B6A136",
      bug: "#A6B91A",
      ghost: "#735797",
      steel: "#B7B7CE",
      grass: "#7AC74C",
      electric: "#F7D02C",
      psychic: "#F95587",
      ice: "#96D9D6",
      dragon: "#6F35FC",
      dark: "#705746",
      fairy: "#D685AD",
    },
    maxWidth: {
      1140: "1140px",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
    },
    // boxShadow: {
    //   perfect:
    //     "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
    // },
  },
  variants: {
    extend: {
      width: ["hover", "focus"],
      // scale: ["hover", "hover"],
    },
  },
  plugins: [],
};
