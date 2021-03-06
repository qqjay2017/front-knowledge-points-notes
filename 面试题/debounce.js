// 非立即执行版
// 持续触发不执行
// 不触发的一段时间之后再执行

function debounce(func,wait){

    let timer;
    return function(){
        let context = this;
        let args = arguments

        if(timer) clearTimeout(timer)

        timer = setTimeout(() => {
            func.apply(context,args)
        }, wait);
    }
}



