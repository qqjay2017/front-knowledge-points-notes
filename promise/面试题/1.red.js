/**
 * 题目：
 * 红灯三秒亮一次，
 * 绿灯一秒亮一次，
 * 黄灯2秒亮一次；
 * 如何让三个灯不断交替重复亮灯？（用 Promse 实现）
 */

function red() {
    console.log('red');
}

function green() {
    console.log('green');
}

function yellow() {
    console.log('yellow');
}


function light(timeout, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            cb();
            resolve()
        }, timeout);
    })
}

function step() {
    Promise.resolve().then(() => {
            return light(3000, red)
        })

        .then(() => {
            return light(2000, yellow)
        })
        .then(() => {
            return light(1000, green)
        })
        .then(() => {
            step()
        })
}

step()