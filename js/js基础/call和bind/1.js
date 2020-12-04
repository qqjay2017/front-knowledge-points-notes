function getName(age, home) {
    console.log(this.name, 'name');
    console.log(age, 'age');
    console.log(home, 'home');
}


let obj = {
    name: "张三"
}


// 模拟call,但是,,,
// obj.getName = getName;
// obj.getName()
// delete obj.getName


// call 改变了调用的主体
//  getName.call(obj)

//call是在Function的原型上的


// 重写call
// 扩展Function原型

!(function (prototype) {
    function getDefaultContext(context) {
        // 如果是null或者undefind,变成window
        context = context || window;
        // 如果是传基本类型 string number boolean  就不能加属性了
        // 包装成对象类型
        let type = typeof context;
        if (['number', 'string', 'boolean'].includes(type)) {
            context = new context.constructor(context);
        }
        return context;
    }



    function call2(context, ...args) {
        context = getDefaultContext(context)
        let symbol = Symbol('fn');
        context[symbol] = this;
        context[symbol](...args);
        delete context[symbol];

    }


    function apply2(context, args) {
        context = getDefaultContext(context)
        let symbol = Symbol('fn');
        context[symbol] = this;
        context[symbol](...args);
        delete context[symbol];

    }
    // bind2返回一个函数,新函数的形参列表跟在bind的后面
    function bind2(context, ...outerArgs) {
        // this = getName()
        return (...args) => this.call(context, ...outerArgs, ...args)
    }
    prototype.call2 = call2;
    prototype.apply2 = apply2;
    prototype.bind2 = bind2;

})(Function.prototype);

let  newBind= getName.bind2(obj, 10);
newBind('beijing1')