/**
 * 持续触发并不会执行多次
到一定时间再去执行

 * @param {*} func 
 * @param {*} delay 
 */
function throttle(func, delay){
    let run = true
    return function(){
        if(!run){
            return
        }
        run = false
        setTimeout(()=>{
            func.apply(this, arguments)
            run = true
        }, delay)
    }
}