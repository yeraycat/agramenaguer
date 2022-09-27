/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      display: ["Indie Flower"],
    },
    colors: {
      white: "#ffffff",
      blue: {
        medium: "#005c98",
      },
      black: {
        light: "#262626",
        faded: "#000059",
      },
      grey: {
        base: "#616161",
        background: "#fafafa",
        primary: "#dbdbdb",
      },
      red: {
        primary: "#ed4956",
      },
    },
    extend: {
      maxHeight: {
        "screen-2": "calc(100vh - 100px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
