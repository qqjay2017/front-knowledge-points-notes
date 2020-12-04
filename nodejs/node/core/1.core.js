/**
 * node基于事件的 发布订阅的模块
 * vue $emit  $on 一样的
 * 
 * 原型链继承
 * 
 * 实例的_proto_都会找所属类的原型prototype,
 * 所属类的原型prototype的_proto_默认指向Object,改变指向就可以继承
 * 
 */
//on emit
//  const EventEmitter = require('events')
 const EventEmitter = require('./events.js.js')
 //node提供了util模块,其中最核心的方法是继承
 const util = require('util');


function Girl(){

}

// Girl.prototype._proto_ = EventEmitter.prototype
//es6
//Object.setPrototypeOf( Girl.prototype,EventEmitter.prototype)
//util,让girl继承EventEmitter的公共属性
 util.inherits(Girl,EventEmitter)

 let girl = new Girl()

//只要监听就触发
girl.on('newListener',function(type){
    // 延迟触发
    process.nextTick(()=>{
         girl.emit(type)
        // console.log(type)
    })
})

 girl.once('cry',function(who){
     console.log(who,"哭...")
     
 })
 girl.once('cry',function(who){
    console.log(who,"哭111...")
    
})
// girl.on('cry',function(who){
//     console.log(who,"哭")
// })

//  girl.emit("cry","谁啊")




