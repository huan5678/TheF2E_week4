module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
          lg: "4rem",
        },
        center: true,
      },
      fontSize: {
        h1: "2rem",
      },
      colors: {
        primary: {
          DEFAULT: "#8E7DFA",
          light: "#D2CBFD",
          dark: "#28234C",
        },
        secondary: {
          DEFAULT: "#080231",
        },
        gray: {
          DEFAULT: "#CECCD6",
          dark: "#9C9AAD",
        },
        white: {
          DEFAULT: "#F2F2F4",
        },
        success: "#32A23D",
        error: "#B42D2D",
      },
      fontFamily: {
        sans: [
          "Noto Sans TC",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
};
