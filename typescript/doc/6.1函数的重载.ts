
// 函数的重载

function toArray(value:number):number[]
function toArray(value:string):string[]
function toArray(value:number|string){   // 最后一个是具体的实现,不用标注返回值
    if(typeof value === 'number'){
        return value.toString().split('').map(item=>parseInt(item))
    }else {
        return value.split('')
    }
};

export {}