import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./about/index.html",
    "./blog/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./about/**/*.{js,ts,jsx,tsx}",
    "./blog/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontSize: { "2xs": ["0.6rem", "0.8rem"] } },
  },
  plugins: [],
} satisfies Config;
