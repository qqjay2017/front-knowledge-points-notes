import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";
import { svgBuilder } from "./plugins/vite-plugin-svg";

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === "production";
const isDev = !isProd;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "/@": resolve(__dirname, "./src"),
      "/components": resolve(__dirname, "./src/components"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "mock",
    }),
    svgBuilder("./src/icons/svg/"),
    // WindiCSS(),
  ],
});
