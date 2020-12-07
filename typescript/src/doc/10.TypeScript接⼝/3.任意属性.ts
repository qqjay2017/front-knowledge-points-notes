

// ⽤ 索引签名 的形式来满⾜上述要求。


interface Person {
    name:string;
    age?:number;
    [propsName:string]:any;
}

const p1 = {name:'semlinker'};
const p2 = {name:'lolo',age:5};
const p3 = {name:'kakuqo',sex:1}


export {}