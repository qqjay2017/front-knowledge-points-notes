const { stat } = require("fs");

// 观察者模式
// 观察者包含发布订阅
// vue基于观察者模式
class Subject {
    constructor(name) {
        this.name = name;
        this.state = 0;
        this.arr = [];
    }

    attach(o) {
        this.arr.push(o)
    }

    setState(state) {
        this.state = state;
        this.arr.forEach(o => o.update(state));
    }
}


class Observer {
    constructor(name) {
        this.name = name;
    }

    update(state) {
        console.log(state, '收到了')
    }
}


let s = new Subject('小宝宝');
let o1 = new Observer('我')
let o2 = new Observer('奶奶')

s.attach(o1)
s.attach(o2)

s.setState(2);