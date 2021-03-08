// scope  作用域 - 就是一个个上下文
// Local -当前的活动
// Global - 全局对象(windows)

function one() {

    var a = 1;

    function two() {
        var b = 2;
        var three = () => {
            var c = 3;
            debugger;
            console.log(a, b, c)
        }

        three()
    }

    two()
}

one()

// 模拟运行过程

// 模拟一个运行栈

var executeContextStack = []

//全局上下文
var globalExecuteContext = {
    VO: { one: '()=>{}' }
}
//全局栈
executeContextStack = [globalExecuteContext]
var oneExecuteContext = {
    VO: {
        a: 1,
        two: '()=>{}'
    }

}
executeContextStack = [oneExecuteContext, globalExecuteContext]

var twoExecuteContext = {
    VO: {
        b: 2,
        three: '()=>{}'
    }

}
executeContextStack = [twoExecuteContext,oneExecuteContext, globalExecuteContext]

var threeExecuteContext = {
    VO: {
        c: 3,

    }

}
executeContextStack = [threeExecuteContext,twoExecuteContext,oneExecuteContext, globalExecuteContext];

// 查找过程,一层一层往上找

function getVariableValue(varName){
    for(let i =0;i<executeContextStack.length;i++){
        if(varName in executeContextStack[i].VO){
            return executeContextStack[i].VO[varName]
        }
    }
}
console.log(getVariableValue('a'),getVariableValue('b'),getVariableValue('c'))