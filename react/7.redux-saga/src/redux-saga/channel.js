export function stdChannel(){
    let currentTakers  = []

    function take(cb, matcher){
        console.log(cb,'cb')// function next
        cb['MATCH'] = matcher;
        cb.cancel = ()=>{
          currentTakers = currentTakers.filter(item=>item!==cb);
        }
        currentTakers.push(cb);
    }

    function put(input){
        console.log(input,'input')
        const takers = currentTakers;
        for (let i = 0, len = takers.length; i < len; i++) {
          const taker = takers[i]
          /**
           * taker
           * {MATCH: input => input.type === pattern}
           */
          if (taker['MATCH'](input)) {
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