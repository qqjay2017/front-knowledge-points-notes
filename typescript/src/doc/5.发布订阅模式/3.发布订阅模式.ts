/**
 * 发布 — 订阅是⼀种消息范式，
 *
 * 在发布订阅模式中有三个主要⻆⾊：Publisher（发布者）、 Channels（通道）和 Subscriber（订阅者）

 * */


/**
 *
 * 应用
 * 1.前端框架中模块/⻚⾯间消息通信
 * Vue 使⽤ EventBus 进⾏消息通信
 挂载bus
 Vue.prototype.$bus = new Vue();
 订阅信息
 this.$bus.$on("alert:message", msg => {
    this.showMessage(msg);
 });

 取消订阅
 this.$bus.$off("alert:message");


 推动消息
 this.$bus.$emit("alert:message", msg);

 */


// nodejs 的 event的内置模块

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {
    constructor() {
        super();
    }
}
const myEmitter = new MyEmitter();

myEmitter.on('event',()=>{
    console.log('⼤家好，我是阿宝哥!');
})
myEmitter.emit('event')



export  {}










