import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "class",
  safelist: "select-none",
  preflight: false,
  include: ["src/**/*.{vue,html,jsx,tsx}"],
  exclude: [/node_modules/, /\.git/, /dist/],
  shortcuts: {
    "flex-center": "flex items-center justify-center",
  },
  theme: {
    extend: {
      colors: {
        teal: {
          100: "#ccc",
        },
      },
    },
  },
});
