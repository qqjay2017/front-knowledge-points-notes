
interface D {d:boolean};
interface E {e:string};
interface F {f:number};
1

interface A {x:D};
interface B {x:E};
interface C {x:F};


export type ABC = A & B & C;

// 如果混合类型,存在的相同成员是非基本数据类型,
// 是可以成功合并的,但是不会有提示
let abc:ABC = {
    x:{
        d:true,
        e:'eee',
        f:666
    }
}
console.log(abc)







