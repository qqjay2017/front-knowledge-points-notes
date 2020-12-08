
// 若 T 能够赋值给 U ，那么类型是 X ，否则为 Y 。
// T extends U ? X : Y

interface Dictionary<T=any>{
    [key:string]:T
}

type StrDict = Dictionary<string>;

// 当T 满足 T extends Dictionary 约束时,
// 我们会使用 infer 关键字声明了一 个类型变量 V，并返回该类型，否则返回 never 类型。
type DictMember<T> = T extends Dictionary<infer V>?V:never
// type StrDiceMember = string
type StrDiceMember = DictMember<StrDict>

// 利用条件类型和infer关键字,方便的获取promise对象的返回值类型

async function stringPromise() {
    return "Hello, Semlinker!"
}
interface Person {
    name:string;
    age:number;
}

async function personPromise() {
    return {name:"Semlinker",age:30} as Person
}

type PromiseType<T> = (args:any[])=>Promise<T>
type UnPromise<T> = T extends PromiseType<infer U>?U:never;

// type extractStringPromise = string
type extractStringPromise = UnPromise<typeof stringPromise>
// type extractPersonPromise = Person
type extractPersonPromise = UnPromise<typeof personPromise>



export {}