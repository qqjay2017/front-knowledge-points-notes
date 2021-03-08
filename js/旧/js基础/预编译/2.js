
/**
 * 作用域链是在创建函数时候就已经确定,跟在哪里执行是没有关系
 */

function one() {
    var a = 1;
    function two() {
        console.log(a)
    }

    return two;
}

var a = 2;
var outer_two = one();
outer_two();


// 模拟

executeContextStack=[]

globalVO ={
   
        one:'()=>{}',
        a:undefined,
        outer_two:undefined
   
}
globalContext ={
    VO:globalVO,
    scopeChain:[globalVO] // 作用域链
}

// 开始执行
globalContext.VO.a=2;
// 进入one函数  创建one的执行上下文

var oneVO = {
    two:'()=>{}',
    a:undefined
};

var oneContext = {
    VO:oneVO,
    scopeChain:[oneVO,globalVO] // 作用域链,自己的加上上面的
};

// 开始oneContext的执行阶段
oneContext.VO.a =1;
globalVO.outer_two = 'two'

// 开始执行outer_two 创建outer_two上下文

var outer_twoVO = {
   
};

var outer_twoContext = {
    VO:outer_twoVO,
    scopeChain:[outer_twoVO,oneVO,globalVO] // 作用域链,自己的加上上面的,a就在这里面找
}


