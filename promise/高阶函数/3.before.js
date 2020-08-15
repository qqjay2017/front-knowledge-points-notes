// 我们希望在原有的功能上加一些方法
// vue.mixin

function say(who) {
    console.log(who + "说话");
}


Function.prototype.before = function(callback) {
    let _this = this;
    return function(...args) { // 用箭头函数也可以
        callback()

        _this(...args) // say()

    }
}


let fn = say.before(function() {
    console.log('before say ')
})

fn('小狗')

// vue中的数组的方法重写    函数劫持

// AOP切片

// 调用数组的push方法的时候,先打印调用了push方法
let arr = [1, 2, 3];

let oldPush = Array.prototype.push;

Array.prototype.push = function(...args) {

    console.log('调用了push方法')
    oldPush.call(this, ...args);
}

arr.push(4)
console.log(arr)