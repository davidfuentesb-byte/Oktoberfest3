// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./posts/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    },
    extend: {
      colors: {
        brand: {
          50: "#fff7e6",
          100: "#ffe9bf",
          200: "#ffd27f",
          300: "#ffbf4d",
          400: "#ffb21f",
          500: "#ffb703", // principal (ámbar cálido)
          600: "#fb9e00",
          700: "#e07f00",
          800: "#b56200",
          900: "#8a4a00",
          DEFAULT: "#ffb703", // ← si prefieres más tostado: "#d97706"
          dark: "#fb8500",
        },
        forest: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#14532d", // ← tono “bosque” profundo recomendado
          DEFAULT: "#14532d",
        },
        cream: {
          DEFAULT: "#fff7e6",
        },
        ink: {
          DEFAULT: "#111827",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [typography, forms, aspectRatio, lineClamp],
};

export default config;
