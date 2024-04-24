/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./about/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./about/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontSize: { "2xs": ["0.6rem", "0.8rem"] } },
  },
  plugins: [],
};
