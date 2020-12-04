let zhangdan = {
    name: "张三",
    getName() {
        console.log(this.name);
    }
}

// zhangdan.getName()

// 如果没有人来调,直接执行
let getName = zhangdan.getName;
// 如果是非严格模式,  主体是global;
// 如果是严格模式,就是undefinded
getName()


// 如果是在事件绑定上,this就是绑定的元素