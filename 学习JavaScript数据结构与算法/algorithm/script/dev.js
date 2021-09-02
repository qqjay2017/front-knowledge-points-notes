const execa = require("execa");

const target = "algorithm";

const formats = "cjs";

execa(
  "rollup",
  [
    "-wc",
    "--environment",
    [
      `TARGET:${target}`,
      `FORMATS:${formats || "global"}`,
     
    ]
      .filter(Boolean)
      .join(","),
  ],
  {
    stdio: "inherit",
  }
);
