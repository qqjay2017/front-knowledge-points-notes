// ts中的接口  描述对象的形状
// 接口可以描述   属性 方法 类



//接口和type的区别
// 接口可以被实现 被继承,type不行
// type可以写联合类型,所以一般有联合类型的,用type
// 能用接口用接口,不能用换成type


// 1.接口描述对象
interface FullName {
    firstName: string,
    lastName: string
}

const fullName = (obj: FullName): FullName => {
    return obj;
}
fullName({ firstName: 'z', lastName: 'f' })



// 2. 接口描述函数
interface IFullName {
    (firstName: string, lastName: string) :string
}
// 和上面效果一样的
type fullName1Type = (firstName: string, lastName: string) => string;

const fullName1:IFullName = (firstName: string,
    lastName: string): string => {
    return firstName + lastName;
}


// 3.混合类型
// 即是函数,也有属性,一般用在 一个函数返回一个函数,返回的函数有属性
interface IFn {
    (): number;
    count: number;
}

const fn:IFn = ()=>{
   return ++fn.count;
}
fn.count = 0;
console.log(fn(),fn(),fn())
export { }