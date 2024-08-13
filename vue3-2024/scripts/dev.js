const path = require("node:path");
const args = require("minimist")(process.argv.slice(2));
const esbuild = require("esbuild");
// 打包的模块
const target = args._[0] || "reactivity";

const format = args.f || "global";

const pkg = require(path.resolve(
  __dirname,
  `../packages/${target}/package.json`
));

const outputFormat = format.startsWith("global")
  ? "iife"
  : format === "cjs"
  ? "cjs"
  : "esm";

const outfile = path.resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
);

esbuild
  .context({
    entryPoints: [
      path.resolve(__dirname, `../packages/${target}/src/index.ts`),
    ],
    bundle: true,
    outfile,
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name,
    platform: format === "cjs" ? "node" : "browser",
  })
  .then((r) => {
    console.log("✨ Build succeeded.");
    r.watch();
    console.log("watching...");
  })
  .catch(() => process.exit(1));
