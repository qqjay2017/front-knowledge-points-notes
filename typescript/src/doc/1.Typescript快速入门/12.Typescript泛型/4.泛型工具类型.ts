// 1.typeof

interface  Person {
    name:string;
    age:number;
}
const sem:Person = {name:'semlinker',age:33};

// 类型别名  --> Person
type Sem = typeof sem;

function toArray(x:number):Array<number>{
    return [x];
}
// (x: number) => Array<number>
type Func = typeof toArray;

// 2.keyof,返回值是联合类型

type P1 = keyof Person; //"name" | "age"
let p1:P1 = 'name'

type P2 = keyof Person[]; //"length" | "toString" | "toLocaleString" | "pop" | "push"
let p2:P2 = 'length';

type P3 = keyof {[x:string]:boolean}   // string | number

// 3. in

type keys = 'a' | 'b' | 'c';
type Obj = {
    [p in keys]:any
}

let obj:Obj = {
    a: 'a', b: 'b', c: 'c'
}


// 4. infer

// 5. extends 泛型约束
interface  Lengthwise {
    length:number;
}
// T被约束了Lengthwise接口,必须包含length属性
function loggingIdentity<T extends Lengthwise>(arg:T):T{
    console.log(arg)
    return  arg;
}

// 6. Partial 将某个类型的属性全部变成可选项

// Partial的定义   // lib.es5.d.ts

// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };

interface  Todo {
    title:string;
    description:string;
}

function updateTodo(todo:Todo,fieldToUpdate:Partial<Todo>){
        return {...todo,...fieldToUpdate}
}












export {}