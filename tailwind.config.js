/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0f1114",   // deep charcoal background
        stone: "#d4c9b3",    // warm beige accent
        textDim: "#9ca3af",  // soft gray for secondary text
      },
    },
  },
  plugins: [],
};
