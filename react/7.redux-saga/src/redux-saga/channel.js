

/**
 * 发布订阅模式
 * 标准管道
 * currentTakers   :  订阅的内容
 * take: 订阅,往管道放东西
 * put:  发布,执行对应的回调函数
 */

export function stdChannel(){
    let currentTakers  = []

    function take(cb, matcher){
        //console.log(cb,'cb')// function next
        // matcher 匹配器
        cb['MATCH'] = matcher;
        // cancel take这个effetc只执行一次,所以执行完要移除
        cb.cancel = ()=>{
          currentTakers = currentTakers.filter(item=>item!==cb);
        }
        currentTakers.push(cb);
    }

    function put(input){
        // console.log(input,'input')
        const takers = currentTakers;
        for (let i = 0, len = takers.length; i < len; i++) {
          const taker = takers[i]
          /**
           * taker
           * {MATCH: input => input.type === pattern}
           */
          // 如果匹配上了,就执行
          if (taker['MATCH'](input)) {
            // 先取消订阅,再执行
            taker.cancel();
            taker(input);
          }
        }


    }

    return {
        take,
        put
    }
}