declare module "vite-svg-loader" {
  import { Plugin } from "vite";
  function svgLoader(): Plugin;
  export default svgLoader;
}
