const fs = require("fs");
const execa = require("execa");
const target = fs.readdirSync("packages").filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false;
  }
  return true;
});

runParallel(target, build);

async function runParallel(source, iteratorFn) {
  const ret = [];
  for (const item of source) {
    const p = iteratorFn(item);
    ret.push(p);
  }
  return Promise.all(ret);
}

async function build(target) {
  await execa("rollup",
   ["-c", 
   "--environment",
    `TARGET:${target}`], {
    stdio: "inherit",
  });
}
