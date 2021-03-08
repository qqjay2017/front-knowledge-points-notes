#### 浏览器常驻线程

js引擎线程

GUI线程

http网络请求线程

定时器线程

浏览器事件处理线程

#### 同步任务

预编译,事件压栈.
执行完毕后弹出栈
执行栈其实相当于js主线程


#### 异步任务
ajax是异步函数

1.AJAX进入event table,注册回调函数success.
2.ajax事件完成http请求,线程把任务放进event queue中,主线程调用栈来执行success函数
