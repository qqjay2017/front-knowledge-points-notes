## Promise

- 三种状态

pengding
resolved
rejected



- 状态的表现和变化


pending,不会触发then和catch
resolved,会触发后续的then回调函数
rejected状态,会触发后续的catch回调函数


- then和catch对状态的影响

1. then正常返回resolved,里面有报错则返回 rejected
1. catch正常返回resolved,里面有报错则返回rejected


### 题目

1. 第一题
```js
 Promise.resolve().then(()=>{
      console.log(1)
        }).catch(()=>{
     console.log(2)
        }).then(()=>{
      console.log(3)
 })

```

2. 第二题
```js
 Promise.resolve().then(()=>{
            console.log(1)
            throw new Error("")
        }).catch(()=>{
            console.log(2)
        }).then(()=>{
            console.log(3)
        })
```

2. 第三题
```js

 Promise.resolve().then(()=>{
            console.log(1)
            throw new Error("")
        }).catch(()=>{
            console.log(2)
        }).catch(()=>{
            console.log(3)
        })
```