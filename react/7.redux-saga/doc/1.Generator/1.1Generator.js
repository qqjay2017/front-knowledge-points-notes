
// Generator是生成器，一个函数如果加了*，他就会变成一个生成器函数，
// 他的运行结果会返回一个迭代器对象
// ES6规范中规定迭代器必须有一个next方法，这个方法会返回一个对象，这个对象具有done和value两个属性
// done表示当前迭代器是否已经执行完，执行完为true，否则为false
// value表示当前步骤返回的值

// 当调用迭代器的next方法时，会继续往下执行,遇到yield关键字都会暂停执行,
// 并会将yield后面表达式的值作为返回对象的value

function* generator() {
    try {
        let a = yield 1;
        console.log(a); // 1
        let b = yield 2;
        console.log(b)  // 2
        let c = yield 3;
        console.log(c) // 3
    } catch (error) {
        console.log(error,'error');
    }
}

/**
 * throw 方法可以在函数体外部抛出错误，然后在函数里面捕获
 * return 方法可以终止当前迭代器
 */

let itrator = generator()
const a = itrator.next()
console.log(a, 'a')  
const b = itrator.throw(a.value)
console.log(b, 'b')  
const c = itrator.return(b.value)
console.log(c, 'c') 
const d = itrator.next(c.value)
console.log(d, 'd') 
