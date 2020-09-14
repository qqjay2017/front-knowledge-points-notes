interface Animal {
    name:string,
    age:number
}

interface Person {
    name:string,
    age:number,
    gender:number
}
// / 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(animal:Animal):string{
    return animal.name;
}

let p = {
    name:'zf',
    age:10,
    gender:0
}

getName(p);

let a:Animal ={
    name:'111',
    age:10
    //只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
    // gender:0
}

export {}