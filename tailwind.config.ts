import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        blackberry: {
          50: "#E9E9ED",
          100: "#BDBCC7",
          200: "#7B798F",
          300: "#231F44",
        },
        ube: {
          50: "#F3F2FA",
          100: "#D9D8F0",
          200: "#B3B0E0",
          300: "#807CCC",
        },

        strawberry: {
          50: "#FDEEEF",
          100: "#F8CCCD",
          200: "#EF989A",
          300: "#E55456",
        },
        pineapple: {
          50: "#FEF6E7",
          100: "#FAE4B5",
          200: "#F4C86A",
          300: "#EDA406",
        },
        guava: {
          50: "#E6F8F3",
          100: "#B3E8D9",
          200: "#67D1B2",
          300: "#01B27E",
        },
        blueberry: {
          50: "#E6F6F8",
          100: "#B3E4EA",
          200: "#66C8D4",
          300: "#00A4B8",
        },
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        inter: ["inter"],
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
export default config;
