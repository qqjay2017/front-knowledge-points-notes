

## async/await 

Promise then catch 链式调用，但是也是基于回调函数
async、await是同步语法，测底消灭回调函数

## async、wait和promise的关系

1. async、await是消灭异步回调的终极武器
2. 但是和promise并不互斥
3. 两者相辅相成


- 执行async函数，返回的是Promise对象
- await相当于promise的then
- try catch 可以捕获异常，代替了Promise的catch



## 异步的本质


Js还是单线程，还得是有异步，还是得基于event loop
async、await只是语法糖