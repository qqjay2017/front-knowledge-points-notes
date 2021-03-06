/**
 *
 * @param { 并发限制 } poolLimit
 * @param { promise 数组 } array
 * @param { callback } iteratorFn
 */

function asyncPool(poolLimit, array, iteratorFn) {
    let i = 0;
    const ret = []
    const executing = []
    const enqueue = function () {
        if (i == array.length) {
            // ① 边界条件，array 为空或者 promise 都已达到 resolve 状态
            return Promise.resolve()
        }

        const item = array[i++]

        // ② 生成一个 promise 实例，并在 then 方法中的 onFullfilled 函数里返回实际要执行的 promise，
        const p = Promise.resolve().then(() => iteratorFn(item, array))
        ret.push(p)

        // ④ 将执行完毕的 promise 移除
        const e = p.then(() => executing.splice(executing.indexOf(e), 1))

    }




}