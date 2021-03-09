// 使用定时器对函数进行节流
// 某些代码不可以在没有间断的情况下连续执行

// resize

function throttle(method,context,wait=150){
    clearTimeout(method.tID)
    method.tID = setTimeout(function(){
        method.call(context)
    }, wait);
}