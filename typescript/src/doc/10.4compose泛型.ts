type Func<T extends any[] , R> = (...a:T) => R;

compose()('zf')   // R对应'zf'

compose((str)=>{})('zf')

compose<string,any[],string>((str)=>str,(str2)=>str2)('zf')
compose<string,string,any[],string>((str)=>str,(str1)=>str1,(str2)=>str2)('zf')

// 没有参数的时候
export default function compose(): <R>(a:R)=> R

// 一个参数的时候
export default function compose<F extends Function>(f:F) : F

// 两个参数的时候,compose<string,any[],string>((str)=>str,(str2)=>str2)('zf')
// 'zf':T 流转到  f2的参数,f2返回的string , 流转到f1的参数,f1的返回值string是compose的返回值
export default function compose<A,T extends any[],R>(
    f1:(a:A)=>R,
    f2:Func<T,A>
):Func<T,R>

// 三个参数的时候
export default function compose<A,B,T extends any[],R>(
    f1:(a:B)=>R,
    f2:(a:A)=>B,
    f3:Func<T,A>,
):Func<T,R>

// 四个参数的时候
export default function compose<A,B,C,T extends any[],R>(
    f1:(a:C)=>R,
    f2:(a:B)=>C,
    f3:(a:A)=>B,
    f4:Func<T,A>,
):Func<T,R>


// rest,为啥不写了呢?因为中间件一般就四五个?
// 四个参数的时候
export default function compose<R>(
    f1:(a:any)=>R,
    ...funcs:Function[]
):(...args:any[])=>R

// 实现
export default function compose(...funcs: Function[]) {
    if (funcs.length === 0) {
        return <T>(arg: T): T => arg
    }
    if (funcs.length == 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}

export { }