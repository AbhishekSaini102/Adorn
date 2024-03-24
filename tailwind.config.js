/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: {
        max: "max-content",
      },
      margin: {
        0.2: "0.05rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
