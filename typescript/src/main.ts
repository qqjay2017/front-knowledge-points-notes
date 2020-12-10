import {EventEmitter} from "./doc/5.发布订阅模式/4.发布订阅模式实战";


const eventEmitter = new EventEmitter();
// 订阅
eventEmitter.subscribe("ts",(msg)=>{
    console.log(`收到订阅的信息: ${msg}`);
});
// 多个地方订阅
eventEmitter.subscribe("ts",(msg1)=>{
    console.log(`第二次订阅:收到订阅的信息: ${msg1}`);
});
// 推送
eventEmitter.publish('ts',"第一次推送")
// 取消订阅
eventEmitter.unsubscribe("ts");
eventEmitter.publish('ts',"第二次推送")
;(window as any).eventEmitter= eventEmitter;