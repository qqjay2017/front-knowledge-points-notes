
// 只读属性⽤于限制只能在对象刚刚创建的时候修改其值。
interface Person {
    readonly name:string;
    age?:number;
}


// ReadonlyArray<T>类型,把所有可变的方法都去掉了

let a:number[] = [1,2,3,4];
let ro:ReadonlyArray<number> = a;

// ro[0] = 1;// error

// ro.map(r=>r);

// a = ro;// error


export {}