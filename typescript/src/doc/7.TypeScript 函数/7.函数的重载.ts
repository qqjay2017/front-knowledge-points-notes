
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

type Combinable = number|string;

// v在定义重载的时候，⼀定要把最精确的定义放在最前⾯。

export class Calculator {
    add(a:number,b:number):number;
    add(a:string,b:string):string;
    add(a:string,b:number):string;
    add(a:number,b:string):string;
    add(a:Combinable,b:Combinable){
        if(typeof a ==='string' || typeof b === 'string'){
            return a.toString()+ b.toString();
        }
        return a+b;
    }
}

const calculator = new Calculator();
console.log(calculator.add(222,'222'))

export {}