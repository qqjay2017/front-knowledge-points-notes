const fs = require("fs");
// 打开一个进程去做打包操作
const execa = require("execa");
// node解析packages目录，并且过滤掉不是文件夹的
const target = fs.readdirSync("packages").filter((f) => {
  return fs.statSync(`packages/${f}`).isDirectory();
});

runParallel(target, build).then(() => {
  console.log("成功");
});

/**
 * 并发去打包，每次打包都调用build方法
 * @param {*} source
 * @param {*} iteratorFn
 * @returns
 */

async function runParallel(source, iteratorFn) {
  const ret = [];
  for (const item of source) {
    const p = iteratorFn(item);
    ret.push(p);
  }
  // 存储打包时候的promise，等待所有都打包完，调用成功then
  return Promise.all(ret);
}

async function build(target) {
  await execa(
    "rollup",
    // 向rollup.config.js传递环境变量
    ["-c", "--environment", `TARGET:${target}`],
    // 子进程的输出在父进程提现
    {
      stdio: "inherit",
    }
  );
}
