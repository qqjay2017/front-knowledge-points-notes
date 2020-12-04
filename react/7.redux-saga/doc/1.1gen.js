

/**
 * generator函数的使用
 */

 
function co(gen){
    let it = gen()
    let result;
    function next(value){
       console.log(value)// 上一次的结果
        result = it.next(value);
        if(!result.done){
            next(result.value)
        }
    }
    next()
}

function * inner(){
   const inner1 =  yield 'inner1';
   console.log(inner1,'inner1') // 200 inner1
    yield 'inner2';
}

function * gen(){
  const a =   yield 1;
  console.log(a,'a')    // 100 a
    yield *inner();
    yield 2;
}


co(gen)