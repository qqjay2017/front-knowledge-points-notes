/**
 * dva  generator  es6规范里面  可以和promise进行配合
 */

//这就是一个generator函数.特点就是可以暂停
//yield  产出  iterator  迭代器
//for of 循环  必须有iterator   Array.from  [...likeArray]
// function* read() {
//     yield 1;
//     yield 2;
//     yield 3;
//     return 1000;
// }
// let it = read()
// console.log(it.next())


/**
 *   Array.from  将一个类数组转成数组
 */

//  let obj = {
//      0:1,
//      1:2,
//      length:3
//  }
//  console.log(Array.from(obj))

/**
 * 想要用 [...likeArray]  将一个类数组转换成数组,就要提供迭代器
 *  [Symbol.iterator](){
       
   },
   返回一个对象

   迭代器:
   默认是一个对象,具有next方法,调用后返回value和done属性
 * */


let obj = {
    0: 1,
    1: 2,
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                return {
                    value: this[index],
                    done: this.length === index++
                }
            }
        }
    },
    length: 2
}
// console.log([...obj])

/**
 * 模拟了一下,但是可以用 generator生成器生成
 * 一样的效果
 */

let obj2 = {
    0: 1,
    1: 2,
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this[i]
        }
    },
    length: 2
}

// console.log([...obj2])


/**
 * 题目  :碰到yield就停止
 * 
 * it.next(n)   n会传递给上一次yield的返回值
 */


/**
 * co库
 */

// let fs = require('fs').promises

// function* read() {
//     try {
//         let content = yield fs.readFile('./name1.text', 'utf8');
//         let r = yield fs.readFile(content, 'utf8');
//         return r;
//     } catch (error) {
//         console.log("readErr", error)
//     }

// }

// let it = read()
// let {value,done} = it.next()

//拿到上一次的值,传给下一次,因为可能值不是promise,不能then,需要套resolve
// Promise.resolve(value).then(data=>{
//     let {value,done} = it.next(data)
//     Promise.resolve(value).then(data=>{
//         console.log(data)
//     })
// })

//使用递归将data传递下去 
//写一个co方法,参数是generator

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {
                value,
                done
            } = it.next(data)

            if (!done) { //没完成
                Promise.resolve(value).then(data => {

                    next(data) //递归,将then的值传递下去
                }, (err)=>{
                    it.throw(err)       //可以捕获generator中的异常
                    reject()
                })

            } else { //完成了
                resolve(data)

            }
        }
        next()


    })
}

co(read()).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})

/**
 * async await  基于generator+co的模式 
 */

let fs = require('fs').promises


async function read1() {
    try {
        let content = await fs.readFile('./name.text', 'utf8');
        let r = await fs.readFile(content, 'utf8');
        return r;
    } catch (error) {
        console.log("readErr", error)
    }

}

read1().then(data=>console.log(data))