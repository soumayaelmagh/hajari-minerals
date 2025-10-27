import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0f1114",   // site background
        stone: "#d4c9b3",    // beige accent
        textDim: "#9ca3af",  // muted gray
      },
    },
  },
  plugins: [],
});
