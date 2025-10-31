import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0f1114",   // dark charcoal mineral / industrial tone
        stone: "#d4c9b3",    // warm beige highlight
        textDim: "#9ca3af",  // muted gray
      },
    },
  },
  plugins: [],
};

export default config;
