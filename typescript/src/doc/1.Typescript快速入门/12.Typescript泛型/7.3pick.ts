// Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性 的子类型。


// Pick签名

// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };


// 实例
interface Todo {
    title:string;
    description:string;
    completed:boolean;
}
// 从Todo中挑出"title"和"completed"
type TodoPreview = Pick<Todo,"title"|"completed">

const todo:TodoPreview = {
    title:"title",
    completed:true
}
export {}